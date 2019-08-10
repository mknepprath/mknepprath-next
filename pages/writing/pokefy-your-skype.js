import BlogPage from "core/blog-page";

export default () => (
  <BlogPage dateTime="2014-04-02" title="Pokéfy Your Skype">
    <header>
      <h1>Pokéfy Your Skype</h1>
    </header>

    <p>
      If you use Skype on a regular basis, you get used to the constant bleeps
      and bloops it emits when people log in or out, send messages to you, send
      you files, etc. I discovered yesterday (due to a prank) that you can
      actually set voice messages for each of these things, so I’ve put together
      a new Pokémon-themed Notifications scheme!{" "}
    </p>

    <table>
      <tbody>
        <tr>
          <th>Event:</th>
          <th>Speak text:</th>
        </tr>
        <tr>
          <td>When I Sign In</td>
          <td>Gotta catch ‘em all!</td>
        </tr>
        <tr>
          <td>When I Sign Out</td>
          <td>Michael is out of usable Pokémon! Michael blacked out!</td>
        </tr>
        <tr>
          <td>Contact Becomes Available</td>
          <td>Wild “@” appeared!</td>
        </tr>
        <tr>
          <td>Contact Becomes Unavailable</td>
          <td>“@” fainted.</td>
        </tr>
        <tr>
          <td>First Message in Conversation</td>
          <td>“@” wants to battle!</td>
        </tr>
        <tr>
          <td>New Message in Current Conversation</td>
          <td>“@” used TACKLE!</td>
        </tr>
        <tr>
          <td>Contact Request Received</td>
          <td>Michael used POKéBALL!</td>
        </tr>
        <tr>
          <td>Contacts Received</td>
          <td>Gotcha! “@” was caught!</td>
        </tr>
        <tr>
          <td>Incoming File Transfer</td>
          <td>“@” used FILE TRANSFER!</td>
        </tr>
        <tr>
          <td>File Transfer Completed</td>
          <td>It’s super effective!</td>
        </tr>
        <tr>
          <td>File Transfer Failed</td>
          <td>But nothing happened!</td>
        </tr>
      </tbody>
    </table>
    <p>
      Are you ready? A world of dreams and adventures with POKéMON awaits! Let’s
      go!
    </p>
  </BlogPage>
);
