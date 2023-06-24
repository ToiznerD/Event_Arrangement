import { useContext, useState} from "react"
import Context from "../utils/context"
import Layout from "./layout"
import { styles } from '../utils/style'
export default function Contact() {
    const { state, dispatch } = useContext(Context)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(false);
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: name, email: email, message: message})
        })
        if (response.ok)
            setSubmitSuccess(true);
        else
            setSubmitError(true);
    } catch (error) {
        setSubmitError(true);
    }
    setSubmitting(false);
};
    return(
        <Layout title="Event Management">
               <div className="border-b border-gray-900/10 pb-12">
          <h2 className={styles.Title}>Contact Us</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className={styles.subTitle}>
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                      className={styles.inputField}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="email" className={styles.subTitle}>
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.inputField}
                      required
                  />
                </div>
              </div>


              <div className="col-span-full">
                <label htmlFor="about" className={styles.subTitle}>
                  Content
                </label>
                <div className="mt-2">
                  <textarea id="message" name="message" rows={3} onChange={(e) => setMessage(e.target.value)} className={styles.textArea} defaultValue={''} />
                </div>
              </div>
                

            </div>
            
            <div className="sm:col-span-5 mt-5">
              <button className={styles.button} id="submitButton" type="submit" disabled={submitting} >
                  {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>

            {submitSuccess && (
                                        <div className="font-bold text-green-500 mt-3" role="alert">
                                            Message sent successfully!
                                        </div>
                                    )}
                                    {submitError && (
                                        <div className="font-bold text-red-500 mt-3" role="alert">
                                            Error sending message. Please try again later.
                                        </div>
            )}
            
            </form>
        </div>
        </Layout>
    )
}