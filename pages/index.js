import fetch from 'node-fetch';

export default function Home({ branches }) {
  return (
    <div className="container text-center">
      <img src="/branches-logo.svg" className="img-fluid" alt="Pitt CSC Branches" />
        <ul className="list-group">
        {branches.map((branch) => (
          <a href={branch.url} className="list-group-item list-group-item-action">
            {branch.name}
            {branch.description ? `: ${branch.description}` : null}
          </a>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  let branchesRepos = await (await fetch('https://api.github.com/orgs/pittcsc-branches/repos')).json();

  // Filter out the homepage from the list.
  branchesRepos = branchesRepos.filter((branchesRepo) => !branchesRepo.name.includes(".github.io"));

  return {
    props: {
      branches: branchesRepos.map((branchRepo) => ({
        url: `https://branches.pittcsc.org/${branchRepo.name}`,
        name: branchRepo.name,
        description: branchRepo.description,
      })),
    },
  };
}
