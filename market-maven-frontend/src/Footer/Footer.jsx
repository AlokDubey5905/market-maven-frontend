import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import logo from '../assets/logo.svg'; // Replace '../assets/logo.svg' with the actual path to your company logo image


export default function App() {
    return (

        <MDBFooter bgColor='black' className='text-center text-lg-start text-muted '  >

            <section className=''>
                <MDBContainer className='text-center text-md-start mt-5' >
                    <MDBRow className='mt-3'style={{marginLeft:'-1.5cm',marginRight:'-1.2cm'}}>
                        <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
                            <div className='d-flex align-items-center mb-4'>
                                {/*<MDBIcon fab icon='gem' className='me-3' />*/}
                                <img src={logo} alt='Company Logo' style={{width:'302px'}}/>
                            </div>
                            <p style={{color:'white'}}>
                                MarketMaven: Empowering smart investments with AI-driven analytics.
                            </p>
                        </MDBCol>



                        <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4' style={{color:'white'}} >Useful links</h6>
                            <p style={{color:'white'}}>
                                <a href='/aboutUs' className='text-reset'style={{textDecoration:'none'}} >
                                    About Us
                                </a>
                            </p>
                            {/* <p style={{color:'white'}}>
                                <a href='/sectorAnalysis' className='text-reset' >
                                    Sector
                                </a>
                            </p> */}


                        </MDBCol>

                        <MDBCol lg='6' md='12' className='mb-4 mb-md-0'>
                            <h8 className='text-uppercase' style={{color:'#ff8b28'}}>Disclaimer:</h8>

                            <p style={{color:'white'}}>The MarketMaven Smart Score performance is based on historical data and assumptions, not indicative of future results. Results do not represent actual investor returns. Backtested performance has inherent limitations and does not reflect real trading or economic factors. Actual performance may differ significantly. Fees and regulatory considerations not included.
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className='text-center p-4' style={{  backgroundColor: 'black', color:'white'}}>
                © {new Date().getFullYear()} Copyright:
                <a> </a>
                <a className='text-reset fw-bold' href='https://hashedin.com/' style={{textDecoration:'none'}}>
                      Hashedin by Deloitte
                </a>
            </div>
        </MDBFooter>
  
    );
}
