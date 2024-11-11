function About(){
    return(
        <div className = "about">
            <img src="src/assets/imgs/About Us.avif" alt="Background" id="about-background-image" />
            <img src="src/assets/imgs/logo (1).png" alt="Logo" id="about-corner-logo" />

            <article>
                <header>
                    <h1>About Us</h1>
                    <h4>Learn about the team behind Lords of the Abyss</h4>
                </header>
                <main>
                    <h2>The team</h2>
                    <p>Our team is composed of 3 members, each with their own unique set of skills and expertise. We are a group of students who are dedicated to creating the best possible experience for our players.</p>
                    <p>All of us are computer engineering students from the Pontificia Universidad Católica de Chile and we are working on this game as a project for the great class Tecnologías y Aplicaciones Web.</p>

                    <h2>Contact Us</h2>
                    <p>You can reach us to give us feedback or suggestions on how to make this game even better. We are eager to know your ideas!</p>
                    <p>Send an email to any one of us, and we'll get back to you as soon as possible.</p>
                    <ul className="contact-list">
                        <li>Nicolás: <a href="mailto:n.arayat@uc.cl">nicolas@example.com</a></li>
                        <li>Benjamín: <a href="mailto:bmartnez@uc.cl">benjamin@example.com</a></li>
                        <li>Matías: <a href="mailto:matiasharrison@uc.cl">matiasharrison@uc.cl</a></li>
                    </ul>
                </main>
            </article>
            <footer>
            <p>© 2024 Lords of the Abyss - All rights reserved</p>
            </footer>
        </div>
    );
}

export default About