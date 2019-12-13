/** @type {Array<{ id: string, date: string, published: boolean, title: string }>} */
const posts = [
  {
    id: "sequential-art",
    date: "December 12, 2019",
    published: true,
    title: "Sequential Art™"
  },
  {
    id: "mk9000",
    date: "September 29, 2019",
    published: true,
    title: "A Chat with MK 9000"
  },
  {
    id: "design-process",
    date: "September 7, 2019",
    published: true,
    title: "Thoughts on Design Process"
  },
  {
    id: "breathe",
    date: "August 3, 2019",
    published: true,
    title: "Code Should Breathe"
  },
  {
    id: "create-a-website",
    date: "July 22, 2019",
    published: true,
    title: "Create a Simple Website with GitHub Pages"
  },
  {
    id: "creating-lilt-part-5",
    date: "May 17, 2016",
    published: true,
    title: "Creating Lilt — Part 5"
  },
  {
    id: "creating-lilt-part-4",
    date: "March 20, 2016",
    published: true,
    title: "Creating Lilt — Part 4"
  },
  {
    id: "creating-lilt-part-3",
    date: "January 27, 2016",
    published: true,
    title: "Creating Lilt — Part 3"
  },
  {
    id: "creating-lilt-part-2",
    date: "January 21, 2016",
    published: true,
    title: "Creating Lilt — Part 2"
  },
  {
    id: "creating-lilt-part-1",
    date: "November 21, 2015",
    published: true,
    title: "Creating Lilt — Part 1"
  },
  {
    id: "lots-of-little-improvements",
    date: "June 4, 2015",
    published: false,
    title: "Lots of Little Improvements"
  },
  {
    id: "detective-comics",
    date: "April 29, 2015",
    published: true,
    title: "How DC Is Failing Us All"
  },
  {
    id: "twitter-be-nice",
    date: "March 14, 2015",
    published: false,
    title: "Twitter, Be Nice"
  },
  {
    id: "thoughts-on-the-apple-watch",
    date: "September 10, 2014",
    published: false,
    title: "Thoughts on the Apple Watch"
  },
  {
    id: "family-sharing",
    date: "June 4, 2014",
    published: true,
    title: "The Significance of Family Sharing"
  },
  {
    id: "apples-future-wearable",
    date: "April 29, 2014",
    published: true,
    title: "Apple's Future Wearable"
  },
  {
    id: "pokefy-your-skype",
    date: "April 2, 2014",
    published: true,
    title: "Pokéfy Your Skype"
  },
  {
    id: "the-importance-of-design",
    date: "March 20, 2014",
    published: true,
    title: "The Importance of Design"
  },
  {
    id: "design-is-how-it-works",
    date: "March 20, 2014",
    published: true,
    title: "Design Is How It Works"
  },
  {
    id: "my-only-suggestion-for-facebook-paper",
    date: "February 12, 2014",
    published: true,
    title: "My Only Suggestion For Facebook Paper"
  },
  {
    id: "vine-introduces-web-profiles",
    date: "January 3, 2014",
    published: true,
    title: "Vine Introduces Web Profiles"
  },
  {
    id: "app-of-the-year-duolingo",
    date: "December 20, 2013",
    published: false,
    title: "App Of The Year: Duolingo"
  },
  {
    id: "spotify-app-adds-free-option",
    date: "December 19, 2013",
    published: true,
    title: "Spotify App Adds Free Option"
  },
  {
    id: "angry-birds-goes-nintendo",
    date: "December 16, 2013",
    published: true,
    title: "Angry Birds Goes Nintendo"
  },
  {
    id: "steamos-available-december-13th",
    date: "December 12, 2013",
    published: false,
    title: "SteamOS Available December 13th"
  },
  {
    id: "instagram-direct",
    date: "December 12, 2013",
    published: true,
    title: "Instagram Direct"
  },
  {
    id: "ifttt-adds-ios-location",
    date: "December 12, 2013",
    published: true,
    title: "IFTTT Adds iOS Location"
  },
  {
    id: "this-goes-out-to-gruber",
    date: "October 30, 2013",
    published: true,
    title: "Google's Android And The HTC/Amazon Rumor"
  },
  {
    id: "googles-icons-on-ios",
    date: "October 25, 2013",
    published: true,
    title: "Google's Icons On iOS"
  },
  {
    id: "tweetbot-3",
    date: "October 24, 2013",
    published: false,
    title: "Tweetbot 3"
  },
  {
    id: "apple-television",
    date: "October 23, 2013",
    published: false,
    title: "Why Does Everyone Think Apple Plans On Releasing A Television Set?"
  },
  {
    id: "embed-facebook-posts",
    date: "October 17, 2013",
    published: false,
    title: "Embed Facebook Posts"
  },
  {
    id: "square-cash",
    date: "October 16, 2013",
    published: true,
    title: "Square Cash"
  },
  {
    id: "ios-7-flashlight",
    date: "September 26, 2013",
    published: true,
    title: "iOS 7 Flashlight"
  },
  {
    id: "instagram-for-ios-7",
    date: "September 26, 2013",
    published: true,
    title: "Instagram For iOS 7"
  },
  {
    id: "iphone-naming-conventions",
    date: "September 24, 2013",
    published: true,
    title: "iPhone Naming Conventions"
  },
  {
    id: "ios-7-eve",
    date: "September 18, 2013",
    published: true,
    title: "iOS 7 Eve"
  },
  {
    id: "highlighting-apples-most-serious-problem",
    date: "January 11, 2013",
    published: true,
    title: "Highlighting Apple's Most Serious Problem"
  },
  {
    id: "leap-motion",
    date: "January 2, 2013",
    published: false,
    title: "Leap Motion: Give Your Mouse A Break"
  },
  {
    id: "get-things-done",
    date: "September 17, 2012",
    published: true,
    title: "How I Get Things Done"
  },
  {
    id: "design-in-politics",
    date: "September 14, 2012",
    published: false,
    title: "Design In Politics"
  },
  {
    id: "3d-printing",
    date: "August 13, 2012",
    published: false,
    title: "3D Printing and the End of the Industrial Age"
  },
  {
    id: "crowdsourced-news",
    date: "August 13, 2012",
    published: false,
    title: "The Advent of Crowdsourced News"
  },
  {
    id: "use-genesis-to-create-powerful-wordpress-websites",
    date: "July 26, 2012",
    published: false,
    title: "Use Genesis to Create Powerful WordPress Websites"
  },
  {
    id: "introducing-square",
    date: "July 24, 2012",
    published: true,
    title: "You Can Now Accept Credit Cards with Square"
  },
  {
    id: "ifttt",
    date: "July 23, 2012",
    published: true,
    title: "Leverage the Combined Power of Your Services with IFTTT"
  },
  {
    id: "video-games-are-evolving",
    date: "July 19, 2012",
    published: true,
    title: "Video Games Are Evolving!"
  },
  {
    id: "buffer",
    date: "July 10, 2012",
    published: true,
    title: "Become More Effective On Twitter with Buffer"
  },
  {
    id: "pocket",
    date: "July 10, 2012",
    published: true,
    title: "Stay On Task with Pocket"
  },
  {
    id: "pinterest",
    date: "July 6, 2012",
    published: false,
    title: "Harness the Power of Pinterest"
  }
];

export default posts;
