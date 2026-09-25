import { permanentRedirect } from 'next/navigation';

export default function OpenDeployPage() {
  // Keep existing bookmarks without sending visitors to localhost.
  permanentRedirect('/projects/opendeploy');
}
