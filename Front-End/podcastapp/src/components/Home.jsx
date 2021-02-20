import React, { useEffect } from "react";
import './animation.css'

export default function Home() {

  /* ====================
     JavaScript Animation 
     ====================*/
  useEffect(() => {
    if (document.getElementsByClassName('banner')[0]){
      const banner = document.getElementsByClassName('banner')[0];
      const blocks = document.getElementsByClassName('blocks');
      for(var i =1 ; i<400 ; i++){
        
        banner.innerHTML += "<div class='blocks'> </div>";
        blocks[i].style.animationDelay =`${i*0.02}s`;
    }
    }
  }, [])


  console.log(document.getElementsByClassName('banner'));


    return (
        
        <>
  <section>
        <h2>Titanium</h2>
        <div className="banner">
            <div className="blocks">
            </div>
        </div>
  </section>

  <footer style={{"fontFamily":"sans-serif"}}>

  <div className="container p-4">
   
    <div className="row">
     
      <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
        <h5 className="text-uppercase">Podcast Wbsite</h5>

        <p>
        Podcast website where you can have your own channel and ability to upload audio of your own . Podcast website offer Subscription other channels and
         interact with them in efficient and effective way . Enjoy the journey
        </p>
      </div>
      
      <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
        <h5 className="text-uppercase">Contact Us</h5>

        <ul className="list-unstyled mb-0">
          <li>
           tgreed_07.@hotmail.com
          </li>
          <li>
          Sara.@gmail.com
          </li>
          <li>
          abdulrahmana.jafar@gmail.com
          </li>
          <li>
          alabydy.nouf@gmail.com
          </li>
        </ul>
      </div>
     
      <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
        <h5 className="text-uppercase mb-0">Contribute With</h5>

        <ul className="list-unstyled">
          <li>
           Marco santonastasi
          </li>
          <li>
          Yasir Almuhtarish
          </li>
          <li>
           Haneen Alghamdi
          </li>
          <li>
            Ali Hamidaddin
          </li>
          <li>
            Sara Kuddah
          </li>
        </ul>
      </div>
     
    </div>
   
  </div>
  


  <div className="text-center p-3" style={{"backgroundColor":"grey"}}>
 
    <a className="text-white" href="https://mdbootstrap.com/">Taghreed Saeed Abdulrahman Aljafar Nouf Alabydy Sara Al-mahameed</a>
  </div>
 
</footer>
   
    </>
    )
}
