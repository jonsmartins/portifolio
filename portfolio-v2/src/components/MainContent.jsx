import AboutContainer from './AboutContainer'
import TechnologiesContainer from './TechnologiesContainer'
import ProjectsContainer from './ProjectsContainer'

import "../styles/components/maincontent.sass"

const MainContent = () => {
  return (
    <main id='main-content'>
      <AboutContainer/>
      <ProjectsContainer/>
      <TechnologiesContainer/>
    </main>
  )
}

export default MainContent