import { expect } from "chai";

import { generatePagination, DEFAULT_LIMIT_PAGINATION } from "../src/utils";

describe("pagination", function () {
  describe("generatePagination", function () {
    it("only require parameters", function () {
      const payload = generatePagination(5);
      expect(payload.pagination.page).equal(5);
      expect(payload.pagination.perPage).equal(DEFAULT_LIMIT_PAGINATION);
      expect(payload.offset).equal(20);
    });

    it("first page", function () {
      const qsA = {
        page: 1,
        pageSize: 3,
      };
      const payloadA = generatePagination(qsA.page, qsA.pageSize);
      expect(payloadA.pagination.page).equal(1);
      expect(payloadA.offset).to.be.equal(0);
    });

    it("second page", function () {
      const qsB = {
        page: 2,
        pageSize: 3,
      };
      const payloadB = generatePagination(qsB.page, qsB.pageSize);
      expect(payloadB.pagination.page).equal(2);
      expect(payloadB.offset).equal(3);
    });

    it("all parameters equal to 0", function () {
      const qsC = {
        page: 0,
        pageSize: 0,
      };
      const payloadC = generatePagination(qsC.page, qsC.pageSize);
      expect(payloadC.pagination.page).equal(1);
      expect(payloadC.offset).equal(0);
    });

    it("invalid parameters", function () {
      const payloadUndefined = generatePagination(undefined, undefined);
      const payloadNull = generatePagination(null, null);

      expect(payloadUndefined.pagination.page).equal(1);
      expect(payloadUndefined.pagination.perPage).equal(
        DEFAULT_LIMIT_PAGINATION
      );
      expect(payloadUndefined.offset).equal(0);
      expect(payloadNull.pagination.page).equal(1);
      expect(payloadNull.pagination.perPage).equal(DEFAULT_LIMIT_PAGINATION);
      expect(payloadNull.offset).equal(0);
    });

    // page equal to 0
    // limit equal to 0
  });
});
