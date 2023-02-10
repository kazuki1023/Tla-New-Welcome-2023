// export default function Home() {
//   return<h1>Hello World</h1>
// }
import Link from 'next/Link'

export default () => <div>
  <h1>Hello World</h1>
  <Link href="/">
    &lt;&lt; 紹介サイトに戻る
  </Link>
</div>

