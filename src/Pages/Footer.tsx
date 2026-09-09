import instagram from '../assets/instagram.png'
import pinterest from '../assets/pinterest-logo.png'
import facebook from '../assets/facebook.png'
import linkedin from '../assets/linkedin-sign.png'
import social from '../assets/social.png'
import burger from '../assets/burger.png'



export default function Footer() {
  return (
    <div className=' flex w-full bg-[#EFEFF4] mb-10 pb-3' >
      <div className='hidden lg:block lg:pt-32 pt-20  pb-16 lg:px-32 px-10  ' >
        <div className=' text-orange-500 md:text-4xl text-2xl font-bold flex justify-center' >FoodieHub</div>
        <div className='w-full flex justify-center' >
        <img src={burger} width={100} className=' w-fit mt-16 object-fill align-bottom' />
        </div>
      </div>
      <div className=' mt-10 w-full xl:px-32 sm:px-5 px-2 lg:pt-12 ' >
        <div className=' text-black w-full flex justify-between ' >
          <div className=' flex flex-col ' >
            <div className=' xl:text-xl sm:text-lg text-[11px] font-bold whitespace-nowrap ' >Company</div>
            <div className=' mt-4 sm:font-bold text-[#636e72] sm:text-sm md:text-md xl:text-lg  text-[11px]' >About us</div>
            <div className=' mt-4 sm:font-bold text-[#636e72] sm:text-sm md:text-md xl:text-lg  text-[11px]' >Swiggy Corpoate</div>
            <div className=' mt-4 sm:font-bold text-[#636e72] sm:text-sm md:text-md xl:text-lg  text-[11px]' >Careers</div>
            <div className=' mt-4 sm:font-bold text-[#636e72] sm:text-sm md:text-md xl:text-lg  text-[11px]' >Team</div>
            <div className=' mt-4 sm:font-bold text-[#636e72] sm:text-sm md:text-md xl:text-lg  text-[11px]' >Swiggy One</div>
            <div className=' mt-4 sm:font-bold text-[#636e72] sm:text-sm md:text-md xl:text-lg  text-[11px]' >Swiggy Instamart</div>
            <div className=' mt-4 sm:font-bold text-[#636e72] sm:text-sm md:text-md xl:text-lg  text-[11px]' >Swiggy Dineout</div>
            <div className=' mt-4 sm:font-bold text-[#636e72] sm:text-sm md:text-md xl:text-lg  text-[11px]' >Minis</div>
            <div className=' mt-4 sm:font-bold text-[#636e72] sm:text-sm md:text-md xl:text-lg  text-[11px]' >Pyng</div>
          </div>
          <div className=' flex flex-col ' >
            <div className=' xl:text-xl sm:text-lg text-[11px] font-bold whitespace-nowrap ' >Contact us</div>
            <div className=' mt-4 sm:font-bold text-[#636e72] sm:text-sm md:text-md xl:text-lg  text-[11px]' >Help & Support</div>
            <div className=' mt-4 sm:font-bold text-[#636e72] sm:text-sm md:text-md xl:text-lg  text-[11px]' >Partner With Us</div>
            <div className=' mt-4 sm:font-bold text-[#636e72] sm:text-sm md:text-md xl:text-lg  text-[11px]' >Ride With Us</div>
            <div className=' mt-4 sm:font-bold text-black sm:text-md md:text-md xl:text-lg pt-8  text-[11px]' >Legal</div>
            <div className=' mt-4 sm:font-bold text-[#636e72] sm:text-sm md:text-md xl:text-lg  text-[11px]' >Terms & Conditions</div>
            <div className=' mt-4 sm:font-bold text-[#636e72] sm:text-sm md:text-md xl:text-lg  text-[11px]' >Cookie Policy</div>
            <div className=' mt-4 sm:font-bold text-[#636e72] sm:text-sm md:text-md xl:text-lg  text-[11px]' >Privacy Policy</div>
          </div>
          <div className=' flex flex-col ' >
            <div className=' xl:text-xl sm:text-lg text-[11px] font-bold whitespace-nowrap ' >Available in</div>
            <div className=' mt-4 sm:font-bold text-[#636e72] sm:text-sm md:text-md xl:text-lg  text-[11px]' >Bangalore</div>
            <div className=' mt-4 sm:font-bold text-[#636e72] sm:text-sm md:text-md xl:text-lg  text-[11px]' >Gurgaon</div>
            <div className=' mt-4 sm:font-bold text-[#636e72] sm:text-sm md:text-md xl:text-lg  text-[11px]' >Hyderabad</div>
            <div className=' mt-4 sm:font-bold text-[#636e72] sm:text-sm md:text-md xl:text-lg  text-[11px]' >Delhi</div>
            <div className=' mt-4 sm:font-bold text-[#636e72] sm:text-sm md:text-md xl:text-lg  text-[11px]' >Mumbai</div>
            <div className=' mt-4 sm:font-bold text-[#636e72] sm:text-sm md:text-md xl:text-lg  text-[11px]' >Pune</div>
          </div>
          <div className=' flex flex-col ' >
            <div className=' xl:text-xl sm:text-lg text-[11px] font-bold whitespace-nowrap ' >Life at Swiggy</div>
            <div className=' mt-4 sm:font-bold text-[#636e72] sm:text-sm md:text-md xl:text-lg  text-[11px] ' >Explore With Swiggy</div>
            <div className=' mt-4 sm:font-bold text-[#636e72] sm:text-sm md:text-md xl:text-lg  text-[11px] ' >Swiggy News</div>
            <div className=' mt-4 sm:font-bold text-[#636e72] sm:text-sm md:text-md xl:text-lg  text-[11px]' >Snackbles</div>
            <div className=' mt-4 sm:font-bold text-black sm:text-sm md:text-md xl:text-lg pt-8  text-[11px]' >Social Links</div>
            <div className=' mt-4 flex justify-between ' >
              <img src={linkedin} width={15}  />
              <img src={instagram} width={15} />
              <img src={facebook} width={15} />
              <img src={pinterest} width={15} />
              <img src={social} width={15} />
            </div>
          </div>
        
        </div>
      </div>
    </div>
  )
}