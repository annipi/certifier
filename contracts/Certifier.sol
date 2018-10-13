pragma solidity ^0.4.23;

contract Certifier {

    address public owner;
    mapping(bytes32 => Course) public courses;
    mapping(bytes32 => Session) public sessions;

    struct Course {
        string name;
        uint cost;
        uint duration;
        uint threshold;
        bytes32[] codes;
        bytes32[] sessions;
        mapping(address => Student) students;
    }

    struct Student {
        string fname;
        string lname;
        uint age;
        string email;
        bytes32[] codes;
    }

    struct Session {
        string topic;
        uint32 timestamp;
    }
    //now returns something like : 1478431966 (which you could convert in a readble form in http://www.unixtimestamp.com/)
    //https://ethereum.stackexchange.com/questions/9858/solidity-is-there-a-way-to-get-the-timestamp-of-a-transaction-that-executed

    //TODO attendance how we are going to that shit?
    struct Attendance {
        mapping(address => Student) students;

    }

    function addCourse( bytes32 _code, string _name, uint _cost, uint _duration, uint _threshold, bytes32[] _codes, bytes32[] _sessions_codes) public restricted {
        courses[_code] = Course({
            name: _name,
            cost: _cost,
            duration: _duration,
            threshold: _threshold,
            codes: _codes,
            sessions: _sessions_codes
        });
    }

    function addSession( bytes32 _session_code, string _topic, uint32 _timestamp) public restricted {
        sessions[_session_code] = Session({
            topic: _topic,
            timestamp: _timestamp
        });
    }

    function getCourse(bytes32 _code) public restricted view returns (string, uint, uint, uint, bytes32[], bytes32[]){
        Course storage course = courses[_code];
        return (course.name, course.cost, course.duration, course.threshold, course.codes, course.sessions);
    }

    function getSession(bytes32 _session_code) public restricted view returns (string, uint32){
        Session storage session = sessions[_session_code];
        return (session.topic, session.timestamp);
    }

    function subscribe(
        bytes32 _code,
        string _fname,
        string _lname,
        uint _age,
        string _email)
            public payable{
        require(msg.value == 3 ether, "You haven't send exactly 3 etther");
        Course storage course = courses[_code];
        course.students[msg.sender] = Student({
            fname: _fname,
            lname: _lname,
            age: _age,
            email: _email,
            codes: new bytes32[](0)
        });
    }

    function addSessionToCourse( bytes32 _course_code, bytes32 _session_code) public restricted {
        Course storage course = courses[_course_code];
        course.sessions.push(_session_code);
    }

    //TODO end this shit
//    function getCourseSessionsCount(bytes32 _course_code) public restricted view returns (uint){
//        Course storage course = courses[_course_code];
//        return course.sessions.length.toFixed();
//    }

    //view -> solo para ver la blookchain y no modificarla
    function isOwner() public view returns (bool) {
        return msg.sender == owner;
    }

    constructor() public {
        owner = msg.sender;
    }

    modifier restricted() {
        require (msg.sender == owner);
        _;
    }

}

