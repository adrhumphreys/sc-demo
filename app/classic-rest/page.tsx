import ClassicClientSideFetch from "@/components/classic-clientside-fetch";
import Link from "next/link";

export default function YeOlClassic() {
  return (
    <div>
      <ClassicClientSideFetch />

      <p>We have:</p>
      <li>A component which renders out a form</li>
      <li>Code that runs on the client side to fetch the books</li>
      <li>Handling for loading states</li>
      <li>We manage invalidating the state</li>
      <li>We handle form submissions</li>
      <br />
      <p>Pain points:</p>
      <li>Our users see a loading state on first load</li>
      <ul>
        <li>We need to now look at caching the API</li>
        <li>Do we use a CDN?</li>
        <li>Do we use cache in the frontend?</li>
        <li>How do we invalidate the cache?</li>
      </ul>
      <li>
        We have a content layout shift, which is bad for our users and SEO
      </li>
      <li>
        The speed to get the content is slow
        <ul>
          <li>
            Our users have to first complete the initial request to load the
            page
          </li>
          <li>They then need to run javascript to boot up react</li>
          <li>
            React needs to mount and then eventually reach the interface for
            this component
          </li>
          <li>On lower end devices this can be slow</li>
        </ul>
      </li>
      <li>We have an API we have to maintain</li>
      <ul>
        <li>
          Classically this has meant having a backend and a frontend tech stack
        </li>
      </ul>
      <br />
      <p>
        Along came <Link href="/classic-ssr">server side rendering</Link>
      </p>
    </div>
  );
}
