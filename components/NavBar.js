import Link from 'next/link'

const NavBar = () => {
   return( 
   <div className="navBar">
       <div className="links">
           <Link href="/" >
                <a>Home</a>
            </Link>
        </div>
       <div className="title">
         BEER MENU
       </div>
    </div>
   );
}

export default NavBar;