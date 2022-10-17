import { AiFillGithub } from 'react-icons/ai';

export default function GitHubButton(props: { className: string }) {
  return (
    <a
      href="https://github.com/derodero24"
      target="_blank"
      rel="noopener noreferrer"
    >
      <AiFillGithub {...props} />
    </a>
  );
}
