import SocialNetworks from './SocialNetworks'
import InformationContainer from './InformationContainer'

import React from 'react'
import Avatar from '../img/jonas.jpeg'
import "../styles/components/sidebar.sass"

const Sidebar = () => {
  return (
    <aside id="sidebar">
      <img src={Avatar} alt="Jonas Martins" />
      <p className='title'>Desenvolvedor Junior</p>
      <SocialNetworks />
      <InformationContainer />
      {/* <a href="" className='btn'>Download currículo</a> */}
      <h2>O sucesso acontece quando a oportunidade encontra o preparo !</h2>
    </aside>
  )
}

export default Sidebar