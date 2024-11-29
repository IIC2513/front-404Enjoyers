function Guide() {
    return (
      <div className="guide">
        <article>
          <header>
            <h1>Game Guide</h1>
            <h4>Your guide to mastering Lords of the Abyss</h4>
          </header>
  
          <main>
            <section>
              <h2>Index</h2>
              <ul>
                <li><a href="#register">Register</a></li>
                <li><a href="#create-character">Create a Character</a></li>
                <li><a href="#create-or-join-game">Create or Join a Game</a>
                  <ul>
                    <li><a href="#create-game">Create a Game</a></li>
                    <li><a href="#join-game">Join a Game</a></li>
                  </ul>
                </li>
                <li><a href="#take-turns">Take Turns: Actions and Combat</a></li>
                <li><a href="#level-up">Level Up</a></li>
                <li><a href="#defeat-final-boss">Defeat the Final Boss</a></li>
              </ul>
            </section>
  
            <section id="register">
              <h2>Register</h2>
              <p>To begin your journey in Lords of the Abyss, you must first register an account. This will allow you to save your progress, track your stats, and join or create games with friends. Simply click the 'Register' button on the main page and follow the prompts to set up your username, email, and password.</p>
            </section>
  
            <section id="create-character">
              <h2>Create a Character</h2>
              <p>After registering, create your character. Choose from several unique classes, each with distinct abilities and attributes. Your choice will shape your gameplay experience, as each class excels in different areas, such as combat strength, agility, or magical prowess.</p>
            </section>
  
            <section id="create-or-join-game">
              <h2>Create or Join a Game</h2>
              <section id="create-game">
                <h3>Create a Game</h3>
                <p>To start a new adventure, create a game. Select the map and set the game duration by choosing the number of turns. Invite friends or make it a public game for others to join. Once everything is set, you're ready to embark on your quest.</p>
              </section>
  
              <section id="join-game">
                <h3>Join a Game</h3>
                <p>Alternatively, you can join an existing game. Browse available games from the lobby, check the number of players, and join the one that suits you best. You'll be ready to jump into the action once the game creator starts the match.</p>
              </section>
            </section>
  
            <section id="take-turns">
              <h2>Take Turns: Actions and Combat</h2>
              <p>Each player takes their turn individually, where they can move, interact with the environment, or engage in combat. Plan your moves carefully, as each action can make a difference. Battle enemies, open chests, or explore the map to gain an advantage.</p>
            </section>
  
            <section id="level-up">
              <h2>Level Up</h2>
              <p>As you progress through the game, your character will have opportunities to level up. Use earned points to improve attributes like strength, agility, and magic, enhancing your character’s abilities and preparing them for tougher challenges ahead.</p>
            </section>
  
            <section id="defeat-final-boss">
              <h2>Defeat the Final Boss</h2>
              <p>Your ultimate goal is to confront and defeat the final boss. This powerful enemy is the last obstacle standing between you and victory. Gather your strength, strategize with allies, and take down the boss to claim victory in Lords of the Abyss.</p>
            </section>
          </main>
  
          <footer>
            <p>Good luck, adventurer! Conquer the Abyss and become a legend.</p>
          </footer>
        </article>
      </div>
    );
  }
  
  export default Guide;
  