import PickupManageModule from "./pickupManage";

const { module } = angular.mock;

describe("PickupManage", () => {
  beforeEach(module(PickupManageModule));

  let $log;
  beforeEach(inject(($injector) => {
    $log = $injector.get("$log");
    $log.reset();
  }));
  afterEach(() => {
    $log.assertEmpty();
  });

  describe("Module", () => {
    it("is named pickupManage", () => {
      expect(PickupManageModule).to.equal("pickupManage");
    });
  });

  describe("Controller", () => {
    let $componentController;
    beforeEach(inject(($injector) => {
      $componentController = $injector.get("$componentController");
    }));

    it("runs $onInit", () => {
      let $ctrl = $componentController("pickupManage", {});
      Object.assign($ctrl, {
        series: [{
          "rule": "FREQ=WEEKLY;BYDAY=WE,TH",
          "start_date": "2017-02-25T19:00:00Z"
        },
        {
          "rule": "FREQ=WEEKLY",
          "start_date": "2017-02-25T19:00:00Z" // Saturday
        }],
        pickups: [{
          "date": "2017-02-25T22:49:00Z"
        },{
          "date": "2017-02-25T22:49:00Z",
          "series": 5
        }]
      });
      $ctrl.$onInit();
      expect($ctrl.dayLookup.SU).to.equal(0);
      expect($ctrl.series[0].startDate.getDate()).to.equal(25);
      expect($ctrl.series[0].$byDay).to.deep.equal(["WE", "TH"]);
      expect($ctrl.series[1].$byDay).to.deep.equal(["SA"]);
      expect($ctrl.series[1].$byDayLong).to.deep.equal(["Saturday"]);
      expect($ctrl.pickups[0].series).to.be.undefined;
    });
  });
});
