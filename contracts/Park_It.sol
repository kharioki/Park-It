// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

interface IERC20Token {
    function transfer(address, uint256) external returns (bool);

    function approve(address, uint256) external returns (bool);

    function transferFrom(
        address,
        address,
        uint256
    ) external returns (bool);

    function totalSupply() external view returns (uint256);

    function balanceOf(address) external view returns (uint256);

    function allowance(address, address) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

contract ParkIt {
    uint256 internal lotsLength = 0;
    address internal cUSDTokenAddress =
        0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    /**
     * @title A single Lot object
     */
    struct Lot {
        address payable owner;
        string lotName;
        string lotLocationName;
        string lotLatitude;
        string lotLongitude;
        uint256 lotCapacity;
        uint256 lotPricePerHour;
        string lotServices;
        uint256 createdAt;
        uint256 spotsTaken;
    }

    mapping(uint256 => Lot) internal lots;

    function getLotsLength() public view returns (uint256) {
        return lotsLength;
    }

    function getLot(uint256 _index)
        public
        view
        returns (
            address payable,
            string memory,
            string memory,
            string memory,
            string memory,
            uint256,
            uint256,
            string memory,
            uint256,
            uint256
        )
    {
        Lot storage item = lots[_index];

        return (
            item.owner,
            item.lotName,
            item.lotLocationName,
            item.lotLatitude,
            item.lotLongitude,
            item.lotCapacity,
            item.lotPricePerHour,
            item.lotServices,
            item.createdAt,
            item.spotsTaken
        );
    }

    function getLotByAddress(address _owner)
        public
        view
        returns (
            address payable,
            string memory,
            string memory,
            string memory,
            string memory,
            uint256,
            uint256,
            string memory,
            uint256,
            uint256
        )
    {
        for (uint256 i = 0; i < lotsLength; i++) {
            Lot storage lot = lots[i];

            if (lot.owner == _owner) {
                return (
                    lot.owner,
                    lot.lotName,
                    lot.lotLocationName,
                    lot.lotLatitude,
                    lot.lotLongitude,
                    lot.lotCapacity,
                    lot.lotPricePerHour,
                    lot.lotServices,
                    lot.createdAt,
                    lot.spotsTaken
                );
            }
        }
        // return (0, "", "", "", "", 0, 0, 0, "", 0, 0, 0, 0);
    }

    function getLotByLocation(string memory _lotLocationName)
        public
        view
        returns (
            address payable,
            string memory,
            string memory,
            string memory,
            string memory,
            uint256,
            uint256,
            string memory,
            uint256,
            uint256
        )
    {
        for (uint256 i = 0; i < lotsLength; i++) {
            Lot storage lot = lots[i];

            bytes32 a = keccak256(abi.encodePacked(lot.lotLocationName));
            bytes32 b = keccak256(abi.encodePacked(_lotLocationName));

            if (a == b) {
                return (
                    lot.owner,
                    lot.lotName,
                    lot.lotLocationName,
                    lot.lotLatitude,
                    lot.lotLongitude,
                    lot.lotCapacity,
                    lot.lotPricePerHour,
                    lot.lotServices,
                    lot.createdAt,
                    lot.spotsTaken
                );
            }
        }
        // return (0, "", "", "", "", 0, 0, 0, "", 0, 0, 0, 0);
    }

    function createLot(
        string memory _lotName,
        string memory _lotLocationName,
        string memory _lotLatitude,
        string memory _lotLongitude,
        uint256 _lotCapacity,
        uint256 _lotPricePerHour,
        string memory _lotServices
    ) public {
        uint256 createdAt = block.timestamp;
        uint256 spotsTaken = 0;

        lots[lotsLength] = Lot(
            payable(msg.sender),
            _lotName,
            _lotLocationName,
            _lotLatitude,
            _lotLongitude,
            _lotCapacity,
            _lotPricePerHour,
            _lotServices,
            createdAt,
            spotsTaken
        );
        lotsLength++;
    }

    /**
     * @title a Session is a reservation of a spot in a lot
     */
    struct Session {
        address payable owner;
        string lotId;
        string lotName;
        string regNumber;
        uint256 startTime;
        uint256 endTime;
        uint256 totalPrice;
    }

    mapping(string => Session[]) public sessions;

    /**
     * @notice create a session
     * @param _lotId the id of the lot
     */
    function createSession(
        string memory _lotId,
        string memory _lotName,
        string memory _regNumber,
        uint256 _index
    ) public {
        uint256 startTime = block.timestamp;
        uint256 endTime = 0;
        uint256 totalPrice = 0;

        Session memory item = Session(
            payable(msg.sender),
            _lotId,
            _lotName,
            _regNumber,
            startTime,
            endTime,
            totalPrice
        );

        sessions[_lotId].push(item);

        // update lot
        Lot storage lot = lots[_index];
        lot.spotsTaken++;
    }

    /**
     * @notice get a session
     * @param _lotId the id of the lot
     * @param _sessionId the id of the session
     */
    function getSession(string memory _lotId, uint256 _sessionId)
        public
        view
        returns (
            address payable,
            string memory,
            string memory,
            string memory,
            uint256,
            uint256,
            uint256
        )
    {
        require(_sessionId >= 0);
        require(sessions[_lotId].length > 0, "Session does not exist");

        Session storage item = sessions[_lotId][_sessionId];
        return (
            item.owner,
            item.lotId,
            item.lotName,
            item.regNumber,
            item.startTime,
            item.endTime,
            item.totalPrice
        );
    }

    /**
     * @notice get all sessions
     * @param _lotId the id of the lot
     */
    function getAllSessions(string memory _lotId)
        public
        view
        returns (
            address payable,
            string memory,
            string memory,
            string memory,
            uint256,
            uint256,
            uint256
        )
    {
        require(sessions[_lotId].length > 0, "Session does not exist");
        Session storage item = sessions[_lotId][0];
        return (
            item.owner,
            item.lotId,
            item.lotName,
            item.regNumber,
            item.startTime,
            item.endTime,
            item.totalPrice
        );
    }

    /**
     * @notice end a session
     * @param _lotId the id of the lot
     * @param _sessionId the id of the session
     */
    function endSession(
        string memory _lotId,
        uint256 _sessionId,
        uint256 _index
    ) public {
        require(_sessionId >= 0);
        require(sessions[_lotId].length > 0, "Session does not exist");

        Session storage item = sessions[_lotId][_sessionId];
        item.endTime = block.timestamp;
        item.totalPrice = calculatePrice(item.startTime, item.endTime, _index);
    }

    /**
     * @notice calculate the price of a session
     * @param _startTime the start time of the session
     * @param _endTime the end time of the session
     * @param _index the id of the lot
     */
    function calculatePrice(
        uint256 _startTime,
        uint256 _endTime,
        uint256 _index
    ) internal returns (uint256) {
        Lot storage lot = lots[_index];
        uint256 totalPrice = 0;
        uint256 duration = _endTime - _startTime;
        if (duration <= 3600) {
            totalPrice = lot.lotPricePerHour;
        } else if (duration <= 86400) {
            totalPrice = lot.lotPricePerHour * 24;
        } else if (duration <= 604800) {
            totalPrice = lot.lotPricePerHour * 24 * 7;
        } else if (duration <= 2592000) {
            totalPrice = lot.lotPricePerHour * 24 * 30;
        }
        return totalPrice;
    }

    /**
     * @notice pay for a session
     * @param _lotId the id of the lot
     * @param _sessionId the id of the session
     * @param _index the id of the lot
     */
    function payForSession(
        string memory _lotId,
        uint256 _sessionId,
        uint256 _index
    ) public payable {
        Session storage item = sessions[_lotId][_sessionId];

        require(
            IERC20Token(cUSDTokenAddress).transferFrom(
                msg.sender,
                item.owner,
                item.totalPrice
            ),
            "Transfer failed"
        );

        // update lot
        Lot storage lot = lots[_index];
        lot.spotsTaken = lot.spotsTaken--;
    }
}
