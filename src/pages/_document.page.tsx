import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { ServerStyleSheets } from '@material-ui/styles'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheetStyled = new ServerStyleSheet()
    const sheetMaterial = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheetStyled.collectStyles(sheetMaterial.collect(<App {...props} />))
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheetStyled.getStyleElement()}
            {sheetMaterial.getStyleElement()}
          </>
        )
      }
    } finally {
      sheetStyled.seal()
    }
  }

  render() {
    return (
      <Html lang="pt-BR">
        <Head />
        <Main />
        <NextScript />
      </Html>
    )
  }
}