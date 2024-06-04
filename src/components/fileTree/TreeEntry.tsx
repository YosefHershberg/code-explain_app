import File from "./File"
import Folder from "./Folder"

interface Props {
    entry: any,
    owner: string,
    repoName: string
}

const TreeEntry = ({ entry, owner, repoName }: Props) => {

    if (entry.type === 'dir') {
        return (
          <div className="my-[3px] text-sm text-gray-200">
            <Folder folder={entry} owner={owner} repoName={repoName} />
          </div>
        );
      } else {
        return (
          <div className="my-[3px] text-sm text-gray-200">
            <File file={entry} owner={owner} repoName={repoName} />
          </div>
        );
      }
}

export default TreeEntry