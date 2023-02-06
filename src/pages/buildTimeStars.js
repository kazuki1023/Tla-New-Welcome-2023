// クライアントサイドでは実行されないため'isomorphic-unfetch'は必要ない
import fetch from 'node-fetch'

// getStaticPropsで取得したスター数とビルド時の時刻を受け取る
function BuildTimeStars(res,stars,build_time) {
  return <>
  <link/>{BuildTimeStars.res}
  </>
}

// ビルド時に実行される
export async function getStaticProps() {
  const res = fetch('https://cdnjs.cloudflare.com/ajax/libs/vegas/2.4.4/vegas.min.js')
  const json = await res.json()
  const stars = json.stargazers_count
  // ビルド時刻の取得
  const build_time = new Date().toString();

  return {
    props: {
      stars,
      build_time
    },
  }
}

export default BuildTimeStars