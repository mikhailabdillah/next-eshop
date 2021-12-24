import Head from 'next/head'

type Props = {
  title?: string | undefined
  noIndex?: boolean
}

const Meta = (props: Props) => {
  return (
    <>
      <Head>
        <title>
          {props.title
            ? `${props.title} | Next-EShop`
            : 'Next-EShop - Best Online Shop'}
        </title>
        {props.noIndex && <meta name="robots" content="noindex" />}
      </Head>
    </>
  )
}

export default Meta
