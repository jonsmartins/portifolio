import "../styles/components/projectscontainer.sass"

const ProjectsContainer = () => {
  return (
    <section>
      <h2>Projetos</h2>
      <p>Aqui alguns de meus projetos:</p>
      <div className="links">
      <a href="https://github.com/jonsmartins/portifolio" className="btn" target="_blank">Portfolio</a>
      <a href="https://github.com/jonsmartins/crud-react-node" className="btn" target="_blank">Projeto fullstack</a>
      <a href="https://github.com/jonsmartins/github_api" className="btn" target="_blank">Consumo de API</a>
      </div>
    </section>
  )
}

export default ProjectsContainer