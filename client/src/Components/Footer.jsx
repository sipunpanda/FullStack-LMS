import { BsFacebook, BsInstagram, BsLinkedin, BsTwitterX } from "react-icons/bs";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative left-0 bottom-0 h-[10vh] py-5 flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800 sm:px-20 text-center">
      <section className="text-lg">Copyright {year} | All rights reserved</section>
      <section className="flex items-center justify-center gap-5 text-2xl text-white">
        <a href="#" className="hover:text-yellow-500 transition-all ease-in-out duration-300 scale-100 hover:scale-110">
          <BsFacebook />
        </a>
        <a href="https://www.instagram.com/_sipun_panda_/" className="hover:text-yellow-500 transition-all ease-in-out duration-300 scale-100 hover:scale-110">
          <BsInstagram />
        </a>
        <a href="https://www.linkedin.com/in/sipun-panda-0bbabb209/" className="hover:text-yellow-500 transition-all ease-in-out duration-300 scale-100 hover:scale-110">
          <BsLinkedin />
        </a>
        <a href="https://twitter.com/SipunPa50472899?s=08/" className="hover:text-yellow-500 transition-all ease-in-out duration-300 scale-100 hover:scale-110">
          <BsTwitterX />
        </a>
      </section>
    </footer>
  );
}

export default Footer;
