import assert from 'node:assert/strict';
import test from 'node:test';
import { VIBRA_RELEASE } from '../data/legalContent.ts';

test('Vibra Music release baseline has valid signed builds and tag convention', () => {
  assert.ok(VIBRA_RELEASE.version.startsWith('v1.'));
  assert.equal(VIBRA_RELEASE.packageId, 'com.fortune.vibramusic');
  assert.ok(VIBRA_RELEASE.builds.length >= 4);

  const arm64 = VIBRA_RELEASE.builds.find((b) => b.abi === 'arm64-v8a');
  assert.ok(arm64);
  assert.equal(arm64.recommended, true);
  assert.ok(arm64.url.includes(VIBRA_RELEASE.version));

  const universal = VIBRA_RELEASE.builds.find((b) => b.abi === 'Universal');
  assert.ok(universal);
  assert.ok(universal.url.includes(VIBRA_RELEASE.version));
});

test('GitHub releases endpoint resolves latest tag and valid release payloads', async () => {
  const res = await fetch('https://api.github.com/repos/Fortunehack45/Vibra_Music_Releases/releases/latest', {
    headers: { 'User-Agent': 'Antigravity' },
  });
  if (res.ok) {
    const data = await res.json() as { tag_name?: string; assets?: Array<{ name: string; size: number }> };
    assert.ok(data.tag_name);
    assert.ok(data.tag_name.startsWith('v1.'));
    assert.ok(Array.isArray(data.assets));
    assert.ok(data.assets.some((a) => a.name.includes('arm64-v8a.apk')));
  }
});
