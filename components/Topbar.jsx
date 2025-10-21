import { RiPhoneFill, RiMailFill } from "react-icons/ri";
import Socials from "./Socials"

const Topbar = () => {
  return ( 
    <section className="py-4 xl:h-16 xl:py-0 bg-gradient-to-t from-[#ffc221] to-[#ffd76e] flex items-center" id="home">
        <div className="container mx-auto">
        {/* telefone,email, social */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6"> 
     
        <div className="hidden xl:flex itens-center gap-8">
          {/* teefone */}
          <div className="flex itens-center gap-3">
            <div className="w-8 h-8 bg-primary text-white flex items-center justify-center">
            
              <RiPhoneFill />
            </div>
            <p className="font-medium text-primary">+55 (21) 99941-7097</p>
          </div>
          
          {/* Email */}
        <div className="flex itens-center gap-3">
          <div className="w-8 h-8 bg-primary text-white flex items-center justify-center">
              <RiMailFill />
            </div>
            <p className="font-medium text-primary">mosansantos@yahoo.com.br</p>
         
          </div>
          </div>
               <Socials containerStyles="flex items-center gap-8 mx-auto xl:mx-0"
            iconStyles="text-primary"/> 
          
      </div>
      </div>
    </section>
  );
};

export default Topbar