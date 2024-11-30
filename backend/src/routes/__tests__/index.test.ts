import index from "../index";
import jsonPackage from "../../../package.json";

describe("index route", () => {
	it("should return the correct API version and version name", () => {
    const result = index();
    expect(result).toEqual({
      version: jsonPackage.version,
      versionName: jsonPackage.versionName,
    });
  });
});
