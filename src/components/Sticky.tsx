import { useEffect, useRef, useState } from "react"

/**
 * dom getBoundingClientReact().top
 * requestAnimationFrame
 */

export function StickyContent(){
    const ref = useRef(null)
    const [fixed, setFixed] = useState(false)
    useEffect(() => {
        const fn = () => {
            const offset = ref.current.getBoundingClientRect().top
            requestAnimationFrame(() => {
                console.log('123')
                // setFixed(offset < 0)
            })
        }
        window.addEventListener('scroll', fn)
        // setTimeout(() => {
        //     window.removeEventListener('scroll', fn)
        // }, 6000)
    }, [])
    useEffect(() => {
        window.addEventListener('scroll', () => {
            console.log(2)
        })
        
    }, [])
    return (
        <div>
            {
                new Array(50).fill(1).map((d, index) => (<p key={index}>{d}</p>))
            }
            <div ref={ref} >
                <div style={{position: fixed? 'fixed':'relative', top: 0}}>kko</div>
            </div>
            {
                new Array(60).fill(1).map((d, index) => (<p key={index}>{d}</p>))
            }
        </div>
    )
}