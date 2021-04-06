import Project from './init'

export default function (argv) {
  const projectName = argv._[1]
  const project = new Project({
    projectName
  })

  project.create()
}
