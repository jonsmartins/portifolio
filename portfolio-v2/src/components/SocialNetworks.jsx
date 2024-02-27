import { FaLinkedinIn, FaGithub, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import '../styles/components/socialnetworks.sass'

const socialNet = [
    { name: "linkedin", icon: <FaLinkedinIn />, url: "https://www.linkedin.com/in/jonas-da-silva-martins-6797ab3a/" },
    { name: "github", icon: <FaGithub />, url: "https://github.com/jonsmartins" },
    { name: "whatsapp", icon: <FaWhatsapp />, url: "https://wa.me/5521982335104" }
]

const SocialNetworks = () => {
    return (
        <section id="social-networks">
            {socialNet.map((network) => (
                <a href={network.url} className="social-btn" id={network.name} key={network.name}>{network.icon}</a>
            ))}
        </section>
    )
}

export default SocialNetworks