function getProjects() {
    const baseUrl = 'https://api.github.com/repos/caiojcosta/';
    const projectUrls = ['Alura-Back-End', 'caio', 'Flappy-Bird', 'ATIVIDADES'];
    const projectPromises = projectUrls.map(projectUrl => fetch(`${baseUrl}${projectUrl}`, { method: 'GET' }));
    var loadingElement = document.getElementById('loading');
    Promise.all(projectPromises)
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(projectsData => {
            // Call showProject function with all projects data
            loadingElement.style.display = 'none';
            showProject(projectsData);
            console.log(projectsData);
        })
        .catch(error => {
            console.error('Error fetching projects:', error);
        });
}

function showProject(data) {
    var listElement = document.getElementById('my-projects-list')
    for (let i = 0; i < data.length; i++)
    {
        let a = document.createElement("a")
        a.href = data[i]['clone_url']
        a.target = '_blank'
        a.title = data[i]['description']
        let linkText = document.createTextNode(data[i]['name'])
        a.appendChild(linkText)
        listElement.appendChild(a)
    }
}

getProjects();