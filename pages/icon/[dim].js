import NextHead from "next/head";
import { useRouter } from 'next/router'

export default () => {
    const router = useRouter()

    const { dim } = router.query
 
    return <>
        <NextHead>
            <title> ‍ </title>
            <link rel="apple-touch-icon" sizes="57x57" href={`/assets/icon/${dim}.png`}></link>
        </NextHead>
        
        <img src={`/assets/icon/${dim}.png`} />
    </>
}