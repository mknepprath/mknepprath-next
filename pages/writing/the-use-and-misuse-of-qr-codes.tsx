import BlogPage from "@core/blog-page";
import Image from "next/legacy/image";

export const meta: Meta = {
  published: true,
  publishedAt: "2012-09-25",
  title: "The Use and Misuse of QR Codes",
  image: "/assets/qrcode.jpg",
};

export default function TheUseAndMisuseOfQrCodes(): React.ReactNode {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      ogImage={meta.image}
      title={meta.title}
    >
      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        I first noticed it as I wandered a mall - QR codes on every sign and
        storefront. All it took was a few bad scans for me to give up on them
        entirely. QR codes suck. It&apos;s an unfortunate fact, caused by over a
        year of abuse.
      </p>
      <p>
        <Image
          alt="QR code."
          className="corner-radius-8"
          height={471}
          layout="responsive"
          priority
          src="/assets/qrcode.jpg"
          width={700}
        />
      </p>
      <p>
        It&apos;s not too late to fix this situation, however. First, let&apos;s
        diagnose the problem.
      </p>
      <ol>
        <li>
          <strong>&ldquo;What is a QR code?&rdquo;</strong> As it turns out,
          many people still haven&apos;t heard of these mystical codes. This
          doesn&apos;t surprise me. Look at 95%+ of the QR codes out there
          today. How many of them come with instructions on how to use them?
        </li>
        <li>
          <strong>They&apos;re applied incorrectly.</strong> There&apos;s are{" "}
          <a href="http://wtfqrcodes.com/">entire websites</a> dedicated to
          strange QR code sightings. The lesson to take from this website is to
          test your codes before giving them away in bottles, on muffins, etc,
          and think about where the person has to be located to scan them. And
          please, don&apos;t put a QR code on a billboard. People are distracted
          enough while driving without having to try to line their phone up with
          a sign a quarter mile away.
        </li>
        <li>
          <strong>They&apos;re ugly.</strong> Honestly, not much can be done
          about this. It&apos;s going to end up looking like a code. A possible
          solution might be to expand it into looking like something more
          relevant, however, like I did for{" "}
          <a href="/assets/QR-Guitar.jpg">this code</a>.
        </li>
        <li>
          <strong>Most codes lead to garbage.</strong> In the mall mentioned
          earlier, I scanned multiple codes that lead to store websites. While
          there&apos;s nothing inherently wrong with this, none of these
          websites were optimized to be viewed on a mobile phone. Huge turn off.
          People are scanning your codes with their phones, so the page they are
          taken to better be designed for a phone.
        </li>
        <li>
          <strong>It&apos;s not worth their time.</strong> I&apos;ve been told
          time and time again how easy it is to scan a code. Guess what?
          It&apos;s not. The person has to pull out their phone, find the QR
          code scanner app (unless they don&apos;t have it already, in which
          case, add at least three more steps), hold their phone in place for a
          few seconds, and wait for the page to load. As a customer, this is a
          huge inconvenience. What you&apos;re offering better be worth it! By
          now I&apos;m sure you&apos;re as unsurprised as I am to find that
          it&apos;s usually not.
        </li>
      </ol>
      <p>
        This is a terrible situation for you if you want to use a QR code. Even
        if you educate your customers, even if you apply the code in an
        ingenious way, even if it&apos;s beautiful, and even if it leads to the
        most beautiful site with the greatest offer EVER... people may not scan
        it. Why? Because they&apos;ve been taught that QR codes suck.
      </p>
      <p>
        How do we change their perception? Don&apos;t forget the pitfalls above.
        Do it right every time. Make it worth the scan. People will begin to
        trust your codes. More people will use them. Other marketers will see
        your success and realize what they need to do. People will begin to
        trust their codes. And so on.
      </p>
    </BlogPage>
  );
}
