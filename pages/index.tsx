import stylesHome from '../styles/Home.module.scss';
import text from '../utils/textContent.json';
import { useLang } from '../context/LanguageProvider';
import { useEffect } from 'react';

export default function Home() {
  
  const isNor = useLang();

  useEffect(() => {
    if(document.body.classList.contains('solbergBackground')) {
      document.body.classList.remove('solbergBackground')    
    }
    if(document.body.classList.contains('kolbjornrudBackground')) {
      document.body.classList.remove('kolbjornrudBackground')    
    }
  });

  return (
    <div className={`container`}>

      <div className={stylesHome.home}>
        <div className={stylesHome.companyPicture}>
          <img src="/group.JPG" alt="groupPhoto"/>
        </div>
        <h3 className={stylesHome.companyMotto}>{isNor ? text.nor.home.companyMotto : text.eng.home.companyMotto}</h3>
        <div className={stylesHome.companyDescription}>
            <p>{isNor ? text.nor.home.companyDescription.p1 : text.eng.home.companyDescription.p1}</p>
            <p>{isNor ? text.nor.home.companyDescription.p2 : text.eng.home.companyDescription.p2}</p>
            <p>{isNor ? text.nor.home.companyDescription.p3 : text.eng.home.companyDescription.p3}</p>
        </div>
        <div className={`row ${stylesHome.employees}`}>
            <div className={`${stylesHome.employee}`}>
                <h4 className={stylesHome.employeeName}>Elisabeth Hernes</h4>
                <div className={stylesHome.employeePhotoContainer}>
                  <img src="/ELISABETH.jpg" alt="Elisabeth"/>
                </div>
                <p className={stylesHome.employeeDescription}>{isNor ? text.nor.home.employeeDescription.elizabeth : text.eng.home.employeeDescription.elizabeth}</p>
            </div>
            <div className={`${stylesHome.employee}`}>
                <h4 className={stylesHome.employeeName}>Kamila Derewianska</h4>
                <div className={stylesHome.employeePhotoContainer}>
                  <img src="/KAMILA.jpg" alt="Kamila"/>
                </div>
                <p className={stylesHome.employeeDescription}>{isNor ? text.nor.home.employeeDescription.kamila : text.eng.home.employeeDescription.kamila}</p>
            </div>
            <div className={`${stylesHome.employee}`}>
                <h4 className={stylesHome.employeeName}>Ida Louise Vordtvedt</h4>
                <div className={stylesHome.employeePhotoContainer}>
                  <img src="/IDA.jpg" alt="Ida"/>
                </div>
                <p className={stylesHome.employeeDescription}>{isNor ? text.nor.home.employeeDescription.ida : text.eng.home.employeeDescription.ida}</p>
            </div>
            <div className={`${stylesHome.employee}`}>
                <h4 className={stylesHome.employeeName}>Anine Aarum Teig</h4>
                <div className={stylesHome.employeePhotoContainer}>
                  <img src="/Anine.JPG" alt="Anine"/>
                </div>
                <p className={stylesHome.employeeDescription}>{isNor ? text.nor.home.employeeDescription.anine : text.eng.home.employeeDescription.anine}</p>
            </div>
        </div>
        <div className={stylesHome.companyDescription}>
            <p>{isNor ? text.nor.home.companyDescription.p4 : text.eng.home.companyDescription.p4}</p>
        </div>
      </div>
    </div>
  )
}

