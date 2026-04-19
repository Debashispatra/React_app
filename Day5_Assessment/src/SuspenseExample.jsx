import { Suspense, use } from "react";

function fetchMessage() {
    return new Promise((resolve) =>{
        setTimeout(() => resolve("Hello from the resolved promise!"), 5000)
    })
}

function MessageContent({messagePromise}){
    const message = use(messagePromise)
    return <p>{message}</p>
}

// We define the promise outside the component so it remains stable.
const messagePromise = fetchMessage();

function SuspenseExample(){
    return(
        <section>
            <h2>Suspense and Promise Demo</h2>
            <Suspense fallback={<p>Loading...</p>}>
                <MessageContent messagePromise={messagePromise}/>
            </Suspense>
        </section>
    )
}

export default SuspenseExample