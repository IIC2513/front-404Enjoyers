import './../assets/styles/style.css'

function Navbar(){
  return (
        <nav>
            <ul>
                <li><a href="/">Inicio</a></li>
                <li><a href="src/views/guide.html">Guía</a></li>
                <li><a href="src/views/wiki.html">Wiki</a></li>
                <li><a href="src/views/about.html">About Us</a></li>
            </ul>
        </nav>
  );
}

export default Navbar