import fetch from "node-fetch";

export default function Home({ branches }) {
  return (
    <main className="container mx-auto pb-24 px-4">
      <img
        src="/branches-logo.svg"
        className="mx-auto max-w-3xl max-h-96"
        alt="Pitt CSC Branches"
      />
      <div className="flex flex-col items-center justify-center space-y-8 lg:flex-row lg:gap-8 lg:space-y-0">
        <div className="mx-auto p-8 max-w-xl leading-loose bg-secondary-200 rounded-lg">
          <h2 className="mb-4 text-2xl font-bold lg:text-4xl">
            What are branches?{" "}
            <span className="inline-block transform hover:-rotate-6 hover:scale-110 transition">
              🤔
            </span>
          </h2>
          CSC Branches is CSC's initiative to further develop the SCI community
          and foster more niche interests within. Through this program, CSC
          members will be able to easily create and manage their own communities
          (called "Branches") by forgoing SCI and SORC bureaucracy via CSC. This
          allows club founders, open source projects, and small interest groups
          to focus less on monotonous paperwork and slow processes, and more on
          what matters - their community, passions, missions, and members.
        </div>
        <div className="mx-auto p-8 max-w-xl leading-loose bg-gray-100 rounded-lg space-y-2">
          <h2 className="mb-4 text-2xl font-bold lg:text-4xl">
            Links to sites{" "}
            <span className="inline-block transform hover:rotate-6 hover:scale-110 transition">
              🔗
            </span>
          </h2>
          <ul className="flex flex-col items-start justify-center space-y-4">
            {branches.map((branch) => (
              <li>
                <a
                  href={branch.url}
                  className="text-primary hover:underline font-bold"
                  key={branch.name}
                >
                  {branch.name}
                </a>
                <div>{branch.description ? `${branch.description}` : null}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

export async function getStaticProps() {
  let branchesRepos = await (
    await fetch("https://api.github.com/orgs/pittcsc-branches/repos")
  ).json();

  // Filter out the homepage from the list.
  branchesRepos = branchesRepos.filter(
    (branchesRepo) => !branchesRepo.name.includes(".github.io")
  );

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
