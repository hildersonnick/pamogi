const ProjectDashboard = (props) => {
    //   const [projects, setProjects] = useState([]);
    //   const [loading, setLoading] = useState(true);
  
    //   useEffect(() => {
    //     const fetchData = async () => {
    //       const result = await axios(
    //         'https://jsonplaceholder.typicode.com/users',
    //       );
    //       setProjects(result.data);
    //       setLoading(false);
    //     };
    //     fetchData();
    //   }, []);
  
    //   return (
    //     <div>
    //       <h1>Project Dashboard</h1>
    //       {loading ? (
    //         <p>Loading...</p>
    //       ) : (
    //         <ul>
    //           {projects.map(project => (
    //             <li key={project.id}>
    //               <Link to={`/projects/${project.id}`}>{project.name}</Link>
    //             </li>
    //           ))}
    //         </ul>
    //       )}
    //     </div>
    //   );
  
    return (
      <div>
        <h1>{props.projectData}</h1>
  
        <h2>Project Dashboard Menu</h2>
      </div>
    );
  };
  
  export default ProjectDashboard;