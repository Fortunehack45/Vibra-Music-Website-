import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getHashForLegalDoc,
  getLegalDocument,
  getPathForLegalDoc,
  getSeoMetadataForRoute,
  parseLegalHash,
  parseLegalRoute,
} from './legalRoutes.ts';
import { VIBRA_FAQS, VIBRA_RELEASE } from '../data/legalContent.ts';

test('parseLegalHash resolves privacy, terms, security, and license fragments cleanly', () => {
  assert.equal(parseLegalHash('#privacy-policy'), 'privacy');
  assert.equal(parseLegalHash('#privacy'), 'privacy');
  assert.equal(parseLegalHash('#terms-and-conditions'), 'terms');
  assert.equal(parseLegalHash('#terms'), 'terms');
  assert.equal(parseLegalHash('#security'), 'security');
  assert.equal(parseLegalHash('#security-policy'), 'security');
  assert.equal(parseLegalHash('#license'), 'license');
  assert.equal(parseLegalHash('#gplv3'), 'license');
  assert.equal(parseLegalHash('#top'), null);
  assert.equal(parseLegalHash(''), null);
});

test('parseLegalRoute resolves standalone URL paths and falls back to hash fragments', () => {
  assert.equal(parseLegalRoute('/privacy-policy', ''), 'privacy');
  assert.equal(parseLegalRoute('/terms-and-conditions/', ''), 'terms');
  assert.equal(parseLegalRoute('/security', ''), 'security');
  assert.equal(parseLegalRoute('/license', ''), 'license');
  assert.equal(parseLegalRoute('/', '#security'), 'security');
  assert.equal(parseLegalRoute('/', '#license'), 'license');
  assert.equal(parseLegalRoute('/', ''), null);
});

test('getPathForLegalDoc and getHashForLegalDoc return canonical standalone URLs', () => {
  assert.equal(getPathForLegalDoc('privacy'), '/privacy-policy');
  assert.equal(getPathForLegalDoc('terms'), '/terms-and-conditions');
  assert.equal(getPathForLegalDoc('security'), '/security');
  assert.equal(getPathForLegalDoc('license'), '/license');
  assert.equal(getPathForLegalDoc(null), '/');

  assert.equal(getHashForLegalDoc('privacy'), '#privacy-policy');
  assert.equal(getHashForLegalDoc('terms'), '#terms-and-conditions');
  assert.equal(getHashForLegalDoc('security'), '#security');
  assert.equal(getHashForLegalDoc('license'), '#license');
  assert.equal(getHashForLegalDoc(null), '#top');
});

test('getSeoMetadataForRoute produces branded SEO title, description, and canonical path for every page', () => {
  const home = getSeoMetadataForRoute(null);
  assert.match(home.title, /Vibra Music/);
  assert.equal(home.canonicalPath, '/');
  assert.ok(home.description.length >= 100 && home.description.length <= 170);

  for (const docType of ['privacy', 'terms', 'security', 'license'] as const) {
    const seo = getSeoMetadataForRoute(docType);
    assert.match(seo.title, /Vibra Music/);
    assert.equal(seo.canonicalPath, getPathForLegalDoc(docType));
    assert.ok(seo.description.length > 60);
  }
});

test('standalone legal, security, and license documents reflect accurate Vibra Music disclosures', () => {
  const privacy = getLegalDocument('privacy');
  const terms = getLegalDocument('terms');
  const security = getLegalDocument('security');
  const license = getLegalDocument('license');

  const privacyText = JSON.stringify(privacy);
  assert.match(privacyText, /com\.fortune\.vibramusic/);
  assert.match(privacyText, /EncryptedSharedPreferences/);
  assert.match(privacyText, /beat_this_int8\.onnx/);
  assert.match(privacyText, /party\.vibramusic\.store/);

  const termsText = JSON.stringify(terms);
  assert.match(termsText, /GPLv3/);
  assert.match(termsText, /QuickJS/);

  const securityText = JSON.stringify(security);
  assert.match(securityText, /1\.8\.x/);
  assert.match(securityText, /48 hours/);
  assert.match(securityText, /clearSpotifyWebSession/);
  assert.match(securityText, /checksums\.txt/);

  const licenseText = JSON.stringify(license);
  assert.match(licenseText, /GNU General Public License/);
  assert.match(licenseText, /binimum\/am-lyrics/);
  assert.match(licenseText, /THERE IS NO WARRANTY/);
});

test('official release builds and FAQs are populated accurately', () => {
  assert.equal(VIBRA_RELEASE.version, 'v1.8.186');
  assert.equal(VIBRA_RELEASE.builds.length, 4);
  assert.ok(VIBRA_RELEASE.builds.some((b) => b.abi === 'arm64-v8a' && b.recommended));
  assert.ok(VIBRA_FAQS.length >= 6);
});
