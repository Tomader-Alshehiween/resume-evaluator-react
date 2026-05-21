import { useState } from 'react'

function useEvaluator() {

    const [jobDescription, setJobDescription] = useState('')
    const [prompt, setPrompt] = useState('')
    const [file, setFile] = useState(null)

    const [status, setStatus] = useState('idle')

    const [errorMessage, setErrorMessage] = useState('')

    const [result, setResult] = useState('')

    function handleSubmit(e) {
        e.preventDefault()

        if (!jobDescription.trim()) {
            setStatus('error')
            setErrorMessage('Job description is required.')
            return
        }

        if (!file) {
            setStatus('error')
            setErrorMessage('Please upload a resume PDF.')
            return
        }

        setStatus('loading')

        setTimeout(() => {

            setStatus('success')

            setResult(
                `Evaluating ${file.name}... ChatGPT integration coming in Stage 5.`
            )

        }, 1500)
    }

    return {
        jobDescription,
        setJobDescription,

        prompt,
        setPrompt,

        file,
        setFile,

        status,

        errorMessage,

        result,

        handleSubmit,
    }
}

export default useEvaluator