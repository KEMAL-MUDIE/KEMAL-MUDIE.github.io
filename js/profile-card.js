window.addEventListener("DOMContentLoaded", async function () {
  async function get(url) {
    const resp = await fetch(url);
    return resp.json();
  }

  document.querySelectorAll(".stack-card").forEach(async function (el) {
    const userId = el.getAttribute("user-id");

    const response = await get(`https://api.stackexchange.com/2.2/users/${userId}?site=stackoverflow`);
    const user = response.items[0];
    const { profile_image, website_url, link, display_name, reputation, user_id } = user;
    const { gold, silver, bronze } = user.badge_counts;

    el.innerHTML = `
    <div style="font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji; border: 1px solid #e1e4e8; border-radius: 6px; line-height: 1.5; padding: 16px; font-size: 14px; color: #24292e; background-color: #f9bf3f;">
      <div style="display: flex; align-items: center;">
        <img style="width: 48px; height: 48px; border-radius: 50%" src="${profile_image}" alt="Profile image"></img>
        <div style="display: flex; flex-direction: column; margin-left: 12px">
          <span style="font-weight: 500; color: #000; font-size: 18px">
            <a style="text-decoration: none; color: inherit;" target="_blank" href="${website_url || link}">
              ${display_name}
            </a>
          </span>
          <span style="font-weight: 400; color: #586069; font-size: 12px">
            @${link.replace("https://", '').replace(`/users/${user_id}`, '')}
          </span>
        </div>
      </div>

      <div style="margin-top: 12px; display: flex; justify-content: space-evenly; align-items: center; ">
        <div style="margin-top: -4px">
          <span style="font-size: 10px; font-weight: 500; color: #586069;">
            REPUTATION
          </span>
          <div style="font-weight: 400; color: #211F1F; font-size: 12px; margin-top: 2px">
            <span style="font-weight: 600; color: #211F1F; font-size: 32px; line-height: 1;">
              ${reputation}
            </span>
          </div>
        </div>
        <div style="margin-top: -4px">
          <span style="font-size: 10px; font-weight: 500; color: #586069;">
            BADGES
          </span>
          <div style="font-weight: 400; color: #211F1F; font-size: 12px; margin-top: 2px">
            <span style="font-weight: 600; color: #211F1F; font-size: 32px; line-height: 1;">
              ${Number(gold) + Number(silver) + Number(bronze)}
            </span>
          </div>
        </div>
      </div>
    </div>
    `;
  });
});


window.addEventListener("DOMContentLoaded", async function () {
  async function get(url) {
    const resp = await fetch(url);
    return resp.json();
  }

  document.querySelectorAll(".github-card").forEach(async function (el) {
    const username = el.getAttribute("username");

    const response = await get(`https://api.github.com/users/${username}`);
    const { name, avatar_url, public_repos, followers, html_url, following } = response;

    el.innerHTML = `
      <div style="font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji; border: 1px solid #e1e4e8; border-radius: 6px; line-height: 1.5; padding: 16px; font-size: 14px; color: #24292e; background-color: #f9bf3f;">
        <div style="display: flex; align-items: center; margin-top: -4px">
          <img style="width: 48px; height: 48px; border-radius: 50%" src="${avatar_url}" alt="Profile image"></img>
          <div style="display: flex; flex-direction: column; margin-left: 12px">
            <span style="font-weight: 500; color: #000; font-size: 18px">
              <a style="text-decoration: none; color: inherit;" target="_blank" href="${html_url}">
                ${name}
              </a>
            </span>
            <span style="font-weight: 400; color: #586069; font-size: 12px">
              @${html_url.replace('https://github.com/', '')}
            </span>
          </div>
        </div>

        <div style="margin-top: 12px; display: flex; justify-content: space-evenly; align-items: center; ">
          <div style="display: flex; flex-direction: column;">
            <span style="font-size: 10px; font-weight: 500; color: #586069;">
              REPOSITORIES
            </span>
            <span style="font-weight: 600; color: #211F1F; font-size: 32px; line-height: 1">
              ${public_repos}
            </span>
          </div>
          <div style="display: flex; flex-direction: column;">
            <span style="font-size: 10px; font-weight: 500; color: #586069;">
              FOLLOWERS
            </span>
            <span style="font-weight: 600; color: #211F1F; font-size: 32px; line-height: 1">
              ${followers}
            </span>
          </div>
          <div style="display: flex; flex-direction: column;">
            <span style="font-size: 10px; font-weight: 500; color: #586069;">
              FOLLOWING
            </span>
            <span style="font-weight: 600; color: #211F1F; font-size: 32px; line-height: 1">
              ${following}
            </span>
          </div>
        </div>
      </div>
    `;
  });
});

window.addEventListener("DOMContentLoaded", async function () {
  async function get(url) {
    const resp = await fetch(url);
    return resp.json();
  }

window.addEventListener("DOMContentLoaded", async function () {
  async function get(url) {
    const resp = await fetch(url);
    return resp.json();
  }

  async function getLinkedInProfile(username) {
    const clientId = 7743nfb54hwdac ; // Replace with your actual client ID
    const clientSecret = FRTJja2c69DPXIXs ; // Replace with your actual client secret

    // Step 1: Get an access token from LinkedIn
    const tokenResponse = await fetch(
      `https://www.linkedin.com/oauth/v2/accessToken?grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
    );
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Step 2: Use the access token to fetch the profile information
    const profileResponse = await fetch(
      `https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Restli-Protocol-Version": "2.0.0",
        },
      }
    );
    const profileData = await profileResponse.json();
    return profileData;
  }

  document.querySelectorAll(".linkedin-card").forEach(async function (el) {
    const username = el.getAttribute("username");

    // Retrieve LinkedIn profile information using the getLinkedInProfile function
    const profileInfo = await getLinkedInProfile(username);
    const { firstName, lastName, profilePicture } = profileInfo;

    const profileImageUrl =
      profilePicture?.displayImage~.elements[0]?.identifiers[0]?.identifier;

    el.innerHTML = `
      <div style="font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji; border: 1px solid #e1e4e8; border-radius: 6px; line-height: 1.5; padding: 16px; font-size: 14px; color: #24292e; background-color: #f9bf3f;">
        <div style="display: flex; align-items: center; margin-top: -4px">
          <img style="width: 48px; height: 48px; border-radius: 50%" src="${profileImageUrl}" alt="Profile image"></img>
          <div style="display: flex; flex-direction: column; margin-left: 12px">
            <span style="font-weight: 500; color: #000; font-size: 18px">
              ${firstName} ${lastName}
            </span>
            <!-- Add more LinkedIn profile information here -->
          </div>
        </div>

        <div style="margin-top: 12px; display: flex; justify-content: space-evenly; align-items: center; ">
          <!-- Add more LinkedIn-specific information here -->
        </div>
      </div>
    `;
  });
});
