

angular.module('confusionApp')
.controller('MenuController',['$scope','menuFactory', function($scope, menuFactory) {
    $scope.tab = 1;
    $scope.showDetail = false;
    $scope.filtText = '';

    $scope.dishes = menuFactory.getDishes();

    $scope.toggleDetail = function() {
        $scope.showDetail = !($scope.showDetail);
    };

    $scope.select = function(setTab) {
        $scope.tab = setTab;

        if (setTab === 2) {
            $scope.filtText = "appetizer";
        } 
        else if (setTab === 3) { 
            $scope.filtText = "main";
        }
        else if (setTab === 4) { 
            $scope.filtText = "dessert";
        }
        else {
            $scope.filtText = "";
        }
    };

    $scope.isSelected = function(checkTab) {
        return ($scope.tab === checkTab);
    };
}])

.controller('ContactController', ['$scope', function($scope) {

    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };

    var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

    $scope.channels = channels;
    $scope.invalidChannelSelection = false;

}])

.controller('FeedbackController', ['$scope', function($scope) {

    $scope.sendFeedback = function() {

        console.log($scope.feedback);

        if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
            $scope.invalidChannelSelection = true;
            console.log('incorrect');
        }
        else {
            $scope.invalidChannelSelection = false;
            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            $scope.feedback.mychannel="";
            $scope.feedbackForm.$setPristine();
            console.log($scope.feedback);
        }
    };
}])

.controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

    var dish= menuFactory.getDish(parseInt($stateParams.id,10));

    $scope.dish = dish;

}])

.controller('DishCommentController', ['$scope', function($scope) {

    $scope.mycomment = {rating:5, comment:"", author:"", date:""};

    $scope.submitComment = function () {

        $scope.mycomment.date = new Date().toISOString();
        console.log($scope.mycomment);

        $scope.dish.comments.push($scope.mycomment);

        $scope.commentForm.$setPristine();

        $scope.mycomment = {rating:5, comment:"", author:"", date:""};
    };
}])

// implement the IndexController and About Controller here
.controller('IndexController',['$scope','$stateParams', 'menuFactory', 'corporateFactory',function($scope, $stateParams, menuFactory, corporateFactory){
    var promotion = menuFactory.getPromotion(0);
    $scope.promotion = promotion;

    var leader = corporateFactory.getLeader(3);
    $scope.leader = leader;

    var dish = menuFactory.getDish(0);
    $scope.dish = dish;
}])

.controller('AboutController', ['$scope', 'corporateFactory',function($scope, corporateFactory) {
    var leaders = corporateFactory.getLeaders();
    $scope.leaders = leaders;
}])
;
