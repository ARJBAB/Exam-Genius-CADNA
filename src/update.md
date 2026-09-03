What to tell it

Yes, go ahead and make these changes:

Change src/config/api.js:93 from credentials: "same-origin" to credentials: "include"
Add credentials: "include" to the three raw fetch() calls (EditProfile.jsx, StudentSettings.jsx, Dashboard.jsx)
Also fix Dashboard.jsx:48 to use the same fallback pattern as the other files (import.meta.env.VITE_API_URL || "https://cadna-backend-kpgj.onrender.com") instead of no fallback

Show me the diff before I commit.