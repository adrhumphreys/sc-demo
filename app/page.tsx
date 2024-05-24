import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>
        <h2>What&apos;s been happening with React recently?</h2>
        <h1> What are these server components?</h1>
        <p>Lets first start with the context of what we&apos;re running.</p>
        <ul>
          <li>next.js (just a framework on top of react)</li>
          <li>prisma (db orm client)</li>
        </ul>
        <p>
          First we need to look at how we got to here, lets start with the
          classic SPA (single page aplication) approach.
        </p>

        <Link href="/classic-rest">Classic rest</Link>
      </div>
    </main>
  );
}
