import {Button, Col, Container, Form, FormControl, Image, InputGroup, Row} from 'react-bootstrap';

import FontAwesome from './FontAwesome';
import {Link} from 'react-router-dom';
import React from 'react';

class Footer extends React.Component {

	render() {
    	return (
    		<>
			    <section className="footer pt-5 pb-5">
			         <Container>
			            <Row>
			               <Col md={4} sm={12}>
			                  <h6 className="mb-3">Subscribe to our Newsletter</h6>
			                  <Form className="newsletter-form mb-1">
			                     <InputGroup className="mb-3">
								    <FormControl
								       type="text" 
								       placeholder="Please enter your email" 
								    />
								    <InputGroup.Append>
								      <Button type="button" variant="primary">Subscribe</Button>
								    </InputGroup.Append>
								 </InputGroup>
			                  </Form>
			                  <div className="app">
			                     <p className="mb-2">DOWNLOAD APP</p>
			                     <Link to="#">
			                     	<Image src="img/google.png" alt='' fluid />
			                     </Link>
			                     <Link to="#">
			                     	<Image src="img/apple.png" alt='' fluid />
			                     </Link>
			                  </div>
			               </Col>
			               <Col md={1} sm={6} className="mobile-none">
			               </Col>
			            </Row>
			         </Container>
			    </section>
		     
		      <footer className="pt-4 pb-4 text-center">
		         <Container>
		            <p className="mt-0 mb-0">{this.props.copyrightText}</p>
		            <small className="mt-0 mb-0"> Made with <FontAwesome icon={this.props.madewithIconclassName} /> by
		            <Link className="text-danger ml-1" target="_blank" to={`${this.props.firstLink}`}>{this.props.firstLinkText}</Link> - <Link className="text-primary" target="_blank" to={this.props.secondLink}>{this.props.secondLinkText}</Link>
		            </small>
		         </Container>
		      </footer>
		    </>
    	);
    }
}
Footer.defaultProps = {
    sectionclassName: 'footer-bottom-search pt-5 pb-5 bg-white',
	popularCHclassName:'text-black',
	popularCountries: [],
	popularFHclassName:'mt-4 text-black',
	popularFood: [],
	copyrightText: '© Copyright 2019 Osahan Eat. All Rights Reserved',
	madewithIconclassName: 'heart heart-icon text-danger',
	firstLinkText: 'Gurdeep Osahan',
	firstLink: "//www.instagram.com/iamgurdeeposahan/",
	secondLinkText: 'Askbootstrap',
	secondLink: '//askbootstrap.com/',
}



export default Footer;