import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import Copyright from './Copyright';

const socialLinks = [
  { href: '', icon: 'facebook-f' },
  { href: '', icon: 'twitter' },
  { href: '', icon: 'google' },
  { href: '', icon: 'instagram' },
  { href: '', icon: 'linkedin' },
  { href: '', icon: 'github' },
];

const products = ['Angular', 'React', 'Vue', 'Laravel'];
const usefulLinks = ['Pricing', 'Settings', 'Orders', 'Help'];

const contactInfo = [
  { icon: 'home', text: 'Chennai' },
  { icon: 'envelope', text: 'revTask@example.com' },
  { icon: 'phone', text: '+ 9729303230' }
];


function Footer() {
    return (
        <MDBFooter style={{backgroundColor:"white",boxShadow: "2px 0 4px rgba(0, 0, 0, 0.1)" }} className='text-center text-lg-start text-muted'>
          <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
            <div className='me-5 d-none d-lg-block'>
              <span>Get connected with us on social networks:</span>
            </div>
    
            <div>
              {socialLinks.map((link, index) => (
                <a key={index} href={link.href} className='me-4 text-reset'>
                  <MDBIcon color='secondary' fab icon={link.icon} />
                </a>
              ))}
            </div>
          </section>
    
          <section className=''>
            <MDBContainer className='text-center text-md-start mt-5'>
              <MDBRow className='mt-3'>
                <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
                  <h6 className='text-uppercase fw-bold mb-4'>
                    <MDBIcon color='secondary' icon='gem' className='me-3' />
                    Company name
                  </h6>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.tempore voluptate eos quo nam repudiandae totam id nisi sapiente numquam incidunt quaerat iste.
                  </p>
                </MDBCol>
    
                <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
                  <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
                  {products.map((product, index) => (
                    <p key={index}>
                      <a href='#!' className='text-reset'>
                        {product}
                      </a>
                    </p>
                  ))}
                </MDBCol>
    
                <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
                  <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                  {usefulLinks.map((link, index) => (
                    <p key={index}>
                      <a href='#!' className='text-reset'>
                        {link}
                      </a>
                    </p>
                  ))}
                </MDBCol>
    
                <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
                  <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                  {contactInfo.map((info, index) => (
                    <p key={index}>
                      <MDBIcon color='secondary' icon={info.icon} className='me-2' />
                      {info.text}
                    </p>
                  ))}
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </section>
    
          <Copyright />
        </MDBFooter>
      );
}

export default Footer;

