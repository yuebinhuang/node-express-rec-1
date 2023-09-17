const operations = [
  {
    name: "Login",
    endpoint: "/api/login",
    method: "POST",
    fields: { username: "input" },
  },
  {
    name: "Logout",
    endpoint: "/api/logout",
    method: "POST",
    fields: {},
  }
];

const API_URL = "http://localhost:3000";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

async function request(method: HttpMethod, endpoint: string, params?: unknown) {
  try {
    if (method === "GET" && params) {
      endpoint += "?" + new URLSearchParams(params as Record<string, string>).toString();
      params = undefined;
    }
    const res = fetch(API_URL + endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: params ? JSON.stringify(params) : undefined,
    });
    return {
      statusCode: (await res).status,
      response: await (await res).json(),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: "???",
      response: { error: "Something went wrong, check your console log." },
    };
  }
}

function getHtmlOperations() {
  return operations.map((operation) => {
    return `<li class="operation">
      <h3>${operation.name}</h3>
      <form class="operation-form">
        <input type="hidden" name="$endpoint" value="${operation.endpoint}" />
        <input type="hidden" name="$method" value="${operation.method}" />
        ${Object.entries(operation.fields)
          .map(([name, type]) => {
            const tag = type === "json" ? "textarea" : type;
            return `<div class="field">
              <label for="${name}">${name}</label>
              <${tag} name="${name}" id="${name}"></${tag}>
            </div>`;
          })
          .join("")}
        <button type="submit">Submit</button>
      </form>
    </li>`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#operations-list")!.innerHTML = getHtmlOperations().join("");
  document.querySelectorAll(".operation-form").forEach((form) =>
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const { $method, $endpoint, ...reqData } = Object.fromEntries(new FormData(form));
      const endpoint = ($endpoint as string).replace(/:(\w+)/g, (_, key) => reqData[key] as string);

      // If field is json, parse it
      Object.entries(reqData).forEach(([key, value]) => {
        try {
          if ((operations.find((o) => o.endpoint === $endpoint)?.fields as Record<string, string>)[key] === "json") {
            reqData[key] = JSON.parse(value as string);
          }
        } catch (e) {
          console.log(e);
        }
      });

      const response = await request($method as HttpMethod, endpoint as string, Object.keys(reqData).length > 0 ? reqData : undefined);
      document.querySelector("#response-text")!.innerHTML = JSON.stringify(response.response, null, 2);
      document.querySelector("#status-code")!.innerHTML = "(" + response.statusCode.toString() + ")";
    }),
  );
});
