import Page from "core/page";

export default () => (
  <Page
    className={"container"}
    title={"You Can Now Accept Credit Cards with Square"}
  >
    <article>
      <header>
        <h1>You Can Now Accept Credit Cards with Square</h1>
      </header>

      <p>
        As a freelancer, it can be inconvenient to have to wait for a cash or
        check payment. Both require that the client has made preparations to pay
        you, by either getting cash out of the bank, or remembering to write a
        check and bring it to your next meeting. Wouldn’t it be nice if you
        could accept credit cards, something your client probably has on them at
        all times?
      </p>
      <p>
        Introducing <a href="https://squareup.com/">Square</a>, the latest
        project of <a href="https://twitter.com/jack">Jack Dorsey</a>, founder
        of Twitter.
      </p>
      <p>
        This service is extremely easy to use, and is designed beautifully.
        Here’s how to get started.
      </p>
      <ol>
        <li>
          <strong>
            <a href="https://squareup.com/">Sign up.</a>
          </strong>
          You will be asked for your address during this process. This is so
          that you will receive a free Square Card Reader in the mail. This
          reader is absolutely free, they even cover the shipping cost.
        </li>
        <li>
          <strong>Verify your identity.</strong> This is where Square collects
          legal information regarding you and your business.
        </li>
        <li>
          <strong>Add a bank account.</strong> In order to function, you need to
          add a bank account to Square. Payments you accept will be deposited
          into this account.
        </li>
        <li>
          <strong>Get the app.</strong> This is the main requirement. You are
          able to get this app on your iPhone, Android phone, iPad, and even
          your iPod. I’m able to accept payments on my 3 year old iPod Touch!
        </li>
        <li>
          <strong>Join the Square Directory.</strong> Square has a public
          directory where people are able to search for businesses they might
          need. You are asked to create a Public Profile, which is the
          information that comes up when you show up in a search.
        </li>
        <li>
          <strong>Accept payments!</strong> Plug the Square Card Reader into the
          iPhone jack of your device. Open the Square app. Swipe your client’s
          card. From now on, this is all you have to do.
        </li>
      </ol>
      <p>
        One final disclaimer, Square charges 2.75% of the payment per swipe.
        This is so that they can afford to keep the service available, and to
        fund further research and updates. Square is revolutionizing the way we
        exchange money, and other similar services{" "}
        <a href="https://www.paypal.com/webapps/mpp/credit-card-reader">
          like Paypal
        </a>{" "}
        are scrambling to catch up. Square has already developed two more apps,
        one that allows you to{" "}
        <a href="https://squareup.com/register">
          turn your iPad into a register
        </a>
        , and the other allows you to{" "}
        <a href="https://squareup.com/pay-with-square">
          make payments without a card
        </a>
        .
      </p>
      <p>
        Would you ever see yourself using a service like this? Is the fee worth
        the convenience?
      </p>

      <p>
        <time dateTime="2012-07-24">July 24, 2012</time>
      </p>
    </article>
  </Page>
);
