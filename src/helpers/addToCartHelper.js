const AddToCartHelper = {
  //materialListType 0 = can add materials, materialListType 1 = can removable items
  GetProductMaterials: (product, materialListType, productmaterials) => {
    const material_ids = product.product_materials.split(",");
    let materials = [];
    material_ids.forEach((material_id) => {
      let material = productmaterials.find(
        (x) => x.frm_product_materials_id === material_id
      );
      materials.push({
        value: material.frm_product_materials_id,
        label:
          materialListType === 1
            ? material.product_materials +
              "-" +
              parseFloat(material.amount).toFixed(2)
            : material.product_materials,
      });
    });
    return materials;
  },
  HandleMaterialChanges: (event) => {
    let choosenMaterialNames = "";
    let totalMaterialPrice = 0;
    if (event !== null) {
      event.forEach((e) => {
        let values = e.label.split("-");
        choosenMaterialNames += "-" + values[0];
        totalMaterialPrice += parseInt(values[1]);
      });
    }
    return { choosenMaterialNames, totalMaterialPrice };
  },
  HandleRemovableMaterialChange: (event, removableMaterials) => {
    let removedMaterialsName = "";
    if (event !== null) {
      event.forEach((e) => {
        removableMaterials = removableMaterials.filter(
          (item) => item.value !== e.value
        );
      });
    }
    removableMaterials.forEach((item) => {
      removedMaterialsName += item.label + " ";
    });
    return removedMaterialsName;
  },
  HandleMenuModalSubmit: (
    {
      choosedMaterials,
      totalMaterialPrice,
      removedMaterials,
      choosenOptions,
      quantity,
    },
    product
  ) => {
    const productModel = {
      frm_product_id: product.frm_product_id,
      name: product.name,
      price: parseInt(product.price),
      is_menu: product.is_menu,
      quantity: quantity !== undefined ? parseInt(quantity) : 1,
      options: choosenOptions !== undefined ? choosenOptions : "",
      choosedMaterials: "",
      removedMaterials:
        removedMaterials !== "" && removedMaterials !== undefined
          ? " " + removedMaterials
          : "",
    };
    if (choosedMaterials !== "" && choosedMaterials !== undefined) {
      productModel.choosedMaterials += " " + choosedMaterials;
      productModel.price += parseInt(totalMaterialPrice);
    }

    return productModel;
  },
  Reorder: (orderDetail, product) => {
    const cartItemModel = {
      frm_product_id: orderDetail.product_id,
      name: product.name,
      price: parseInt(orderDetail.price),
      is_menu: product.is_menu,
      quantity: parseInt(orderDetail.quantity),
      options: orderDetail.options,
      choosedMaterials: orderDetail.material_add,
      removedMaterials: orderDetail.material_removed,
    };
    return cartItemModel;
  },
};

export default AddToCartHelper;
