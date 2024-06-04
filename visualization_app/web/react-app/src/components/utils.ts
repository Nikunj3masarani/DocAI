import { orderBy } from "lodash";
import { IStatus } from "./types";

export function setCookie(name: string, value: any, days: number) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function getCookie(name: string) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
export function setLocalStorage(
  name: string,
  value: any,
  stringify: boolean = true
) {
  name = "lida_" + name;
  if (stringify) {
    localStorage.setItem(name, JSON.stringify(value));
  } else {
    localStorage.setItem(name, value);
  }
}

export const scrollToElement = (elementRef: any) => {
  // scroll smooth to viz
  if (elementRef.current) {
    elementRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }
};

export const mapNumberToColor = (
  number: number,
  minNumber: number,
  maxNumber: number,
  startColor: string = "#dc2626",
  endColor: string = "#22c55e"
): string => {
  const range = maxNumber - minNumber;
  const fraction = (number - minNumber) / range;

  // Use the fraction to calculate the red, green, and blue components of the tween color
  const red = Math.round(
    parseInt(startColor.slice(1, 3), 16) * (1 - fraction) +
      parseInt(endColor.slice(1, 3), 16) * fraction
  )
    .toString(16)
    .padStart(2, "0");
  const green = Math.round(
    parseInt(startColor.slice(3, 5), 16) * (1 - fraction) +
      parseInt(endColor.slice(3, 5), 16) * fraction
  )
    .toString(16)
    .padStart(2, "0");
  const blue = Math.round(
    parseInt(startColor.slice(5, 7), 16) * (1 - fraction) +
      parseInt(endColor.slice(5, 7), 16) * fraction
  )
    .toString(16)
    .padStart(2, "0");

  // Combine the red, green, and blue components to create the final tween color
  return `#${red}${green}${blue}`;
};

export const downloadBase64File = (base64Data: string, fileName: string) => {
  const linkSource = base64Data;
  const downloadLink = document.createElement("a");
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
  downloadLink.remove();
};

export function getLocalStorage(name: string, stringify: boolean = true): any {
  name = "lida_" + name;
  if (typeof window !== "undefined") {
    const value = localStorage.getItem(name);
    try {
      if (stringify) {
        return JSON.parse(value!);
      } else {
        return value;
      }
    } catch (e) {
      return null;
    }
  } else {
    return null;
  }
}

export function loadJSONData(url: string | URL, payload: any = {}) {
  return fetch(url, payload)
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }
      return response.json().then(function (data) {
        return data;
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

export function fetchJSON(
  url: string | URL,
  payload: any = {},
  onSuccess: (data: any) => void,
  onError: (error: IStatus) => void
) {
  return fetch(url, payload)
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status,
          response
        );
        response.json().then(function (data) {
          console.log("Error data", data);
        });
        onError({
          status: false,
          message:
            "Connection error " + response.status + " " + response.statusText,
        });
        return;
      }
      return response.json().then(function (data) {
        onSuccess(data);
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
      onError({
        status: false,
        message: `There was an error connecting to the specified url. (${err}) `,
      });
    });
}

export function eraseCookie(name: string) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export function truncateText(text: string, length = 50) {
  if (text.length > length) {
    return text.substring(0, length) + " ...";
  }
  return text;
}

export function rebalanceWeights(
  weights: number[],
  index: number,
  value: number
) {
  // rebalance weights in weights such that weights[i] = value and other indices are adjusted such that they sum up to 1
  const num_items = weights.length - 1;
  // budget is the amount of weight that is not assigned to index
  const budget = 1 - value;
  // the amount of weight that is assigned to each other index rounded to nearest 2 decimal place
  const other_value = Math.round((budget / num_items) * 100) / 100;
  // the new weights
  const new_weights = weights.map((w, i) => {
    if (i == index) {
      return value;
    } else {
      return other_value;
    }
  });
  return new_weights;
}

const hashCode = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
};

export const getBrowserFingerprint = () => {
  const userAgent = navigator.userAgent;
  const platform =
    navigator?.userAgentData?.platform || navigator?.platform || "unknown";
  const language = navigator.language;
  const hardwareConcurrency = navigator.hardwareConcurrency;
  const screenResolution = `${window.screen.width}x${window.screen.height}`;
  const timezoneOffset = new Date().getTimezoneOffset();

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.font = "14px Arial";
    ctx.fillText("Browser fingerprint", 10, 20);
  }

  const canvasHash = hashCode(canvas.toDataURL());

  const data = [
    userAgent,
    platform,
    language,
    hardwareConcurrency,
    screenResolution,
    timezoneOffset,
    canvasHash,
  ].join("");

  return hashCode(data);
};
