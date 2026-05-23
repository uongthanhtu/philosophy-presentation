import { useEffect, useState, useRef } from 'react';
import './index.css';

// Cấu trúc dữ liệu 4 câu chuyện triết học tương tác phác thảo chì
const storiesData = [
  {
    id: "rice",
    title: "Hành trình của hạt lúa (Phủ định của phủ định)",
    pages: [
      {
        page: 0,
        image: "/images/comic/rice_cover.webp",
        narration: "Bấm nút 'Sau' hoặc 'Tự động đọc' để bắt đầu mở quyển truyện tranh triết lý về cuộc sống của hai ông cháu bé Nam.",
        dialogs: [
          { speaker: "Lời mở đầu", text: "Chào mừng bạn đến với câu chuyện 'Hành trình của hạt lúa' - góc nhìn trực quan về quy luật Phủ định của Phủ định qua nét vẽ phác thảo chì.", align: "left" }
        ]
      },
      {
        page: 1,
        image: "/images/comic/rice_page_1.webp",
        narration: "Kỳ nghỉ hè năm ấy, Nam về quê với ông ngoại sau một kỳ thi không như ý ở trường. Cậu đứng bên hiên nhà gỗ nhìn ông tỉ mẩn lựa chọn từng hạt giống thóc mẩy nhất.",
        dialogs: [
          { speaker: "Nam", text: "Ông ơi, hạt thóc này đẹp thế sao mình lại ném nó xuống bùn đất bẩn hả ông?", align: "left" },
          { speaker: "Ông ngoại", text: "Con nhìn nó nhỏ bé thế thôi, nhưng muốn làm nên việc lớn, nó phải rời khỏi hòm gỗ ấm áp này con ạ.", align: "right" }
        ]
      },
      {
        page: 2,
        image: "/images/comic/rice_page_2.webp",
        narration: "Hạt lúa chìm sâu dưới lớp bùn đất đen ẩm ướt. Vỏ hạt lúa nứt toác, tự phân hủy dần để nhường chất dinh dưỡng cho mầm non bé nhỏ vươn ra tìm sự sống.",
        dialogs: [
          { speaker: "Ông ngoại", text: "Để tái sinh thành cây lúa mới, hạt thóc cũ phải tự phủ định chính hình hài cũ của mình trong lòng đất tối.", align: "right" }
        ]
      },
      {
        page: 3,
        image: "/images/comic/rice_page_3.webp",
        narration: "Phủ định lần thứ nhất: Cây mạ non xanh mướt kiêu hãnh vươn mình ra khỏi mặt nước ruộng đón ánh nắng ban mai rực rỡ.",
        dialogs: [
          { speaker: "Nam (vui mừng)", text: "Ông ơi nhìn kìa! Hạt thóc đã hoàn toàn biến mất rồi, nhưng một cây non xanh mát đã vươn lên đón nắng!", align: "left" }
        ]
      },
      {
        page: 4,
        image: "/images/comic/rice_page_4.webp",
        narration: "Bầu trời nổi bão giông dữ dội, mưa tuôn gió rít làm cây lúa non oằn mình chống đỡ nghiêng ngả. Nhưng rễ lúa dưới bùn sâu lại bám chặt hơn bao giờ hết.",
        dialogs: [
          { speaker: "Nam (lo lắng)", text: "Gió to quá ông ơi! Cây lúa non yếu ớt thế kia liệu có bị bão quật gãy không ông?", align: "left" },
          { speaker: "Ông ngoại", text: "Đừng sợ! Bão tố giúp rễ lúa ăn sâu vào đất. Sau cơn mưa, đất ruộng lại thêm nhiều chất dinh dưỡng.", align: "right" }
        ]
      },
      {
        page: 5,
        image: "/images/comic/rice_page_5.webp",
        narration: "Giông bão qua đi, bầu trời trong xanh xuất hiện cầu vồng nhạt. Cây lúa đứng thẳng vững chãi, bắt đầu trổ những nhành hoa lúa đầu tiên và ngậm dòng sữa thơm ngọt mát.",
        dialogs: [
          { speaker: "Ông ngoại", text: "Mỗi khó khăn qua đi đều để lại bài học nuôi dưỡng sự trưởng thành. Cây lúa nay đã mạnh mẽ hơn rất nhiều.", align: "right" }
        ]
      },
      {
        page: 6,
        image: "/images/comic/rice_page_6.webp",
        narration: "Phủ định lần hai: Cánh đồng chín vàng rực rỡ dập dờn trong nắng thu. Thân cây lúa xanh hôm nào giờ đã héo úa, dâng toàn bộ sự sống cho bông lúa nặng trĩu hạt.",
        dialogs: [
          { speaker: "Nam", text: "Cây lúa xanh mướt hôm nào giờ đã ngả vàng úa rồi ông ạ. Nhưng bông lúa của nó lại đẹp quá, cong xuống gieo mình.", align: "left" }
        ]
      },
      {
        page: 7,
        image: "/images/comic/rice_page_7.webp",
        narration: "Ông cháu vui mừng khom lưng gặt bông lúa chín vàng óng dẻo thơm. Sự phủ định của phủ định không hủy diệt sạch trơn cái cũ, mà kế thừa và phát triển nó lên tầm cao mới.",
        dialogs: [
          { speaker: "Ông ngoại", text: "Con thấy không, chỉ một hạt lúa gieo xuống bùn ban đầu, nay đã mang về cho ta cả hàng trăm hạt thóc mới trĩu tay.", align: "right" }
        ]
      },
      {
        page: 8,
        image: "/images/comic/rice_page_8.webp",
        narration: "Nam ôm những hạt thóc vàng óng, mẩy chắc và thơm ngào ngạt hương lúa mới của làng quê Việt Nam.",
        dialogs: [
          { speaker: "Nam (kinh ngạc)", text: "Thì ra hạt thóc mới này vừa giống hạt thóc cũ ban đầu, nhưng lại tốt hơn, thơm hơn và nhiều hạt hơn rất nhiều!", align: "left" }
        ]
      },
      {
        page: 9,
        image: "/images/comic/rice_page_9.webp",
        narration: "Nam ngồi ngắm hạt lúa dưới bóng cây đa cổ thụ đầu làng. Cậu bé khẽ mỉm cười tự tin, nhận ra bài học sâu sắc cho những thất bại điểm kém vừa qua của mình.",
        dialogs: [
          { speaker: "Nam (tự nhủ)", text: "Mình hiểu rồi! Những thất bại hôm nay chỉ là lớp bùn tối giúp mình tự nhìn nhận lại và tích lũy sức mạnh để ngày mai trưởng thành hơn.", align: "left" }
        ]
      },
      {
        page: 10,
        image: "/images/comic/rice_page_10.webp",
        narration: "Hai ông cháu vui vẻ gánh lúa về nhà trên con đường làng quanh co rợp bóng tre. Hoàng hôn buông xuống làng quê thanh bình, khói bếp bay lên ấm áp.",
        dialogs: [
          { speaker: "Ông ngoại", text: "Đường đời cũng giống như con đường làng quanh co này vậy con ạ. Dù có uốn khúc và giông bão, chỉ cần kiên trì, ta sẽ gặt hái quả ngọt.", align: "right" }
        ]
      }
    ]
  },
  {
    id: "iron",
    title: "Lửa lò nung thép (Quy luật Lượng - Chất)",
    pages: [
      {
        page: 0,
        image: "/images/comic/iron_cover.webp",
        narration: "Chuyện về bài học rèn thép và quy luật tích lũy lượng - chất của người thợ rèn làng Đa Sỹ.",
        dialogs: [
          { speaker: "Lời mở đầu", text: "Muốn rèn thép tốt, đừng vội vàng đập búa khi lửa chưa đủ đỏ. Hãy cùng xem câu chuyện rèn thép của Tùng và chú Cường.", align: "left" }
        ]
      },
      {
        page: 1,
        image: "/images/comic/iron_page_1.webp",
        narration: "Tùng mới học nghề, muốn nhanh chóng rèn ra một chiếc lưỡi cày sắc bén. Cậu dùng hết sức quai búa vào thanh sắt nguội đen xám.",
        dialogs: [
          { speaker: "Tùng", text: "Tại sao cháu đập mạnh thế này mà thanh sắt chẳng hề cong đi chút nào hả chú?", align: "left" },
          { speaker: "Chú Cường", text: "Cháu đang nôn nóng quá rồi. Muốn sắt biến hình, cháu phải nung nóng nó trước đã.", align: "right" }
        ]
      },
      {
        page: 2,
        image: "/images/comic/iron_page_2.webp",
        narration: "Chú Cường kiên nhẫn dạy Tùng cách nhóm lò và thổi lửa. Nhiệt lượng bắt đầu tích lũy dần vào thanh sắt khi lò bùng lên.",
        dialogs: [
          { speaker: "Chú Cường", text: "Sự thay đổi không diễn ra ngay lập tức. Sắt cần thời gian hấp thụ nhiệt độ trong lò hồng.", align: "right" }
        ]
      },
      {
        page: 3,
        image: "/images/comic/iron_page_3.webp",
        narration: "Dưới sức nóng liên tục, nhiệt độ của thanh sắt tăng dần (sự tích lũy về Lượng), bắt đầu chuyển sang đỏ thẫm rồi đỏ tươi.",
        dialogs: [
          { speaker: "Tùng", text: "Nó đỏ rực lên rồi chú ơi! Cháu đem ra đập được chưa ạ?", align: "left" },
          { speaker: "Chú Cường", text: "Chưa đủ đỏ đâu cháu. Lửa phải đạt tới độ vàng cam rực rỡ - đó mới là 'điểm nút' để sắt hóa mềm.", align: "right" }
        ]
      },
      {
        page: 4,
        image: "/images/comic/iron_page_4.webp",
        narration: "Khi nhiệt độ đạt tới điểm nút (Chất đổi), thanh sắt cứng đầu ban đầu giờ đã trở nên mềm dẻo, dễ uốn nắn dưới nhịp búa của chú Cường.",
        dialogs: [
          { speaker: "Chú Cường", text: "Khi lửa đủ độ, chất của sắt đã thay đổi. Giờ đập một búa bằng mười búa khi sắt nguội!", align: "right" }
        ]
      },
      {
        page: 5,
        image: "/images/comic/iron_page_5.webp",
        narration: "Tùng hăng say đập từng nhát búa nhịp nhàng. Mỗi nhát búa đập xuống là một lượng lực tích lũy để tạo nên hình dáng hoàn hảo của chiếc lưỡi cày.",
        dialogs: [
          { speaker: "Tùng", text: "Cháu hiểu rồi! Phải gõ từng búa một, tích lũy lực đều đặn thì sắt mới thành hình đẹp được.", align: "left" }
        ]
      },
      {
        page: 6,
        image: "/images/comic/iron_page_6.webp",
        narration: "Hạ nhiệt đột ngột (phủ định bước nhảy) làm thay đổi hoàn toàn cấu trúc bên trong của sắt cứng, tôi luyện thành thép vô cùng bền bỉ.",
        dialogs: [
          { speaker: "Chú Cường", text: "Đây là bước nhảy quyết định để sắt hóa thành thép sắc bén. Tôi thép cần sự dứt khoát!", align: "right" }
        ]
      },
      {
        page: 7,
        image: "/images/comic/iron_page_7.webp",
        narration: "Thanh sắt thô ráp ban đầu qua lò lửa và hàng ngàn nhịp búa giờ đã biến thành một sản phẩm thép chất lượng cao, bóng loáng.",
        dialogs: [
          { speaker: "Tùng", text: "Thật kỳ diệu! Thanh sắt xù xì nay đã hóa thành chiếc lưỡi cày thép cứng cáp, sắc lẹm rồi!", align: "left" }
        ]
      },
      {
        page: 8,
        image: "/images/comic/iron_page_8.webp",
        narration: "Lắp thử lưỡi cày vào máy, lưỡi cày lướt phăng phăng xới đất cứng. Chất mới của thép tạo ra năng lực thực tiễn mới nâng hiệu suất vượt trội.",
        dialogs: [
          { speaker: "Bác nông dân", text: "Lưỡi cày tốt quá cháu ơi! Đất cứng thế này mà cày nhẹ như không!", align: "left" }
        ]
      },
      {
        page: 9,
        image: "/images/comic/iron_page_9.webp",
        narration: "Tùng đứng nhìn chiếc lưỡi cày làm việc, cậu bé nhận ra sự kiên trì tích lũy kiến thức từng ngày cũng giống như nung lửa và quai búa.",
        dialogs: [
          { speaker: "Tùng", text: "Hóa ra sự học cũng vậy. Phải tích lũy kiến thức qua từng ngày (Lượng), thì mới mong có ngày đỗ đạt làm nên nghiệp lớn (Chất).", align: "left" }
        ]
      },
      {
        page: 10,
        image: "/images/comic/iron_page_10.webp",
        narration: "Hai chú cháu vui vẻ ra về. Quy luật Lượng - Chất nhắc nhở chúng ta tránh nôn nóng đốt cháy giai đoạn nhưng cũng không được bảo thủ, trì trệ khi thời cơ đã đến.",
        dialogs: [
          { speaker: "Chú Cường", text: "Cứ kiên trì tích lũy lực lượng và kiến thức, cháu sẽ sớm trở thành người thợ rèn giỏi nhất làng này!", align: "right" }
        ]
      }
    ]
  },
  {
    id: "village",
    title: "Ánh sáng bên thềm cũ (Thời kỳ quá độ)",
    pages: [
      {
        page: 0,
        image: "/images/comic/village_cover.webp",
        narration: "Câu chuyện về sự giao thoa, đấu tranh giữa cái mới hiện đại và thói quen cũ bảo thủ tại một làng quê Bắc Bộ đang chuyển dịch kinh tế.",
        dialogs: [
          { speaker: "Lời mở đầu", text: "Thời kỳ quá độ giống như ngôi làng này vậy: Cái mới đang vươn lên nhưng dấu vết cũ vẫn còn hiện hữu bên thềm cũ. Hãy xem câu chuyện của An và cụ Lịch.", align: "left" }
        ]
      },
      {
        page: 1,
        image: "/images/comic/village_page_1.webp",
        narration: "An mang dự án nông nghiệp công nghệ cao về xã, muốn gộp ruộng đất nhỏ lẻ để sản xuất lớn. Cụ Lịch tỏ ra e ngại, muốn giữ mảnh ruộng tổ tiên.",
        dialogs: [
          { speaker: "An", text: "Nếu chúng ta gộp ruộng đất, áp dụng cơ giới hóa chung, năng suất sẽ tăng gấp 3 lần bà con ạ!", align: "left" },
          { speaker: "Cụ Lịch", text: "Ruộng nhà ai nấy giữ, chung đụng thế này nhỡ thất thoát thì biết kêu ai?", align: "right" }
        ]
      },
      {
        page: 2,
        image: "/images/comic/village_page_2.webp",
        narration: "Thói quen tư hữu, tự cấp tự túc từ ngàn đời đã ăn sâu vào tâm thức người nông dân cũ khiến cụ Lịch sợ mất đi mảnh đất cha ông.",
        dialogs: [
          { speaker: "Cụ Lịch", text: "Đất của cha ông bao năm nay nuôi sống cả nhà, giờ giao ra làm chung thấy xót ruột quá.", align: "right" }
        ]
      },
      {
        page: 3,
        image: "/images/comic/village_page_3.webp",
        narration: "Thời kỳ quá độ luôn tồn tại sự đan xen giữa hiện đại và thô sơ. Máy cày hiện đại đã chạy bên cạnh khoảnh vườn cuốc tay cũ kỹ của cụ Lịch.",
        dialogs: [
          { speaker: "An", text: "Cụ ơi, để máy cày xới nốt khoảnh vườn này cho cụ nhé, đỡ tốn sức cuốc tay mệt nhọc lắm cụ.", align: "left" },
          { speaker: "Cụ Lịch", text: "Không cần, tôi tự làm quen tay rồi. Máy móc của các cô làm sao tỉ mẩn bằng tay tôi được.", align: "right" }
        ]
      },
      {
        page: 4,
        image: "/images/comic/village_page_4.webp",
        narration: "Sâu bệnh tấn công bất ngờ. Ruộng cụ Lịch phun thuốc thủ công bị úa vàng, còn ruộng HTX áp dụng flycam phun thuốc sinh học vẫn xanh tốt.",
        dialogs: [
          { speaker: "Cụ Lịch", text: "Tôi đã phun thuốc ba lần rồi mà lúa vẫn rũ xuống thế này, dịch hại đáng sợ quá!", align: "right" }
        ]
      },
      {
        page: 5,
        image: "/images/comic/village_page_5.webp",
        narration: "Muốn cải tạo cái cũ, không thể cưỡng ép mà phải thuyết phục bằng khoa học. An mang thuốc sinh học đến tận ruộng hướng dẫn cụ Lịch chữa sâu hại.",
        dialogs: [
          { speaker: "An", text: "Đây là loại rầy mới kháng thuốc hóa học thông thường cụ ạ. Cụ dùng thử loại sinh học này xem hiệu quả thế nào nhé.", align: "left" }
        ]
      },
      {
        page: 6,
        image: "/images/comic/village_page_6.webp",
        narration: "Cánh đồng HTX của An bội thu, từng gánh lúa vàng trĩu hạt được chở về kho. Ruộng cụ Lịch nhờ An giúp đỡ cũng vớt vát được một phần mùa vụ.",
        dialogs: [
          { speaker: "Cụ Lịch", text: "Lúa bên Hợp tác xã hạt nào hạt nấy chắc nịch, thu hoạch lại nhanh gọn bằng máy gặt đập.", align: "right" }
        ]
      },
      {
        page: 7,
        image: "/images/comic/village_page_7.webp",
        narration: "Sự biến đổi về tinh thần diễn ra chậm chạp hơn kinh tế, nhưng sự chân thành và hiệu quả đã bắt đầu lay chuyển tư duy cũ của cụ Lịch.",
        dialogs: [
          { speaker: "Cụ Lịch", text: "Các cháu vất vả quá, uống bát chè xanh cho mát. Vụ sau... cho tôi đăng ký tham gia Hợp tác xã với nhé!", align: "right" }
        ]
      },
      {
        page: 8,
        image: "/images/comic/village_page_8.webp",
        narration: "Cụ Lịch ký tên gia nhập HTX. Sự chiến thắng của cái mới đối với tàn dư cũ là hành trình kiên trì thuyết phục, cải biến tự giác.",
        dialogs: [
          { speaker: "Cụ Lịch", text: "Tôi hiểu rồi, muốn giàu có thì phải đi chung đường lớn, ôm khư khư mảnh ruộng nhỏ không phát triển nổi.", align: "right" }
        ]
      },
      {
        page: 9,
        image: "/images/comic/village_page_9.webp",
        narration: "Ngôi làng quá độ đang lột xác từng ngày. Cái cũ lạc hậu lùi bước nhường chỗ cho cái mới khoa học, đoàn kết vươn lên vững chắc.",
        dialogs: [
          { speaker: "An", text: "Cảm ơn cụ đã tin tưởng tụi cháu. Chúng ta sẽ cùng nhau xây dựng quê hương trù phú hơn.", align: "left" }
        ]
      },
      {
        page: 10,
        image: "/images/comic/village_page_10.webp",
        narration: "Bản chất của thời kỳ quá độ là cuộc đấu tranh gay gắt nhưng tất thắng của nhân tố xã hội chủ nghĩa mới trước tàn dư lạc hậu.",
        dialogs: [
          { speaker: "Cụ Lịch", text: "Làng mình giờ thay da đổi thịt thật rồi cháu ạ, ánh sáng mới đã về gõ cửa từng nhà.", align: "right" }
        ]
      }
    ]
  },
  {
    id: "mountain",
    title: "Con đường vượt Trường Sơn (Quá độ gián tiếp)",
    pages: [
      {
        page: 0,
        image: "/images/comic/mountain_cover.webp",
        narration: "Câu chuyện vượt núi mở đường Trường Sơn cứu trợ và bài học về con đường quá độ gián tiếp đầy quanh co lên Chủ nghĩa xã hội.",
        dialogs: [
          { speaker: "Lời mở đầu", text: "Để đến được đích, đôi khi ta không thể đi thẳng qua vực sâu, mà phải mở đường tránh quanh co men theo vách núi. Hãy theo chân đội thanh niên xung phong của Hùng và Liên.", align: "left" }
        ]
      },
      {
        page: 1,
        image: "/images/comic/mountain_page_1.webp",
        narration: "Đội thanh niên xung phong nhận nhiệm vụ mở đường vận chuyển lương thực cứu trợ bà con vùng lũ quét bị cô lập sau núi Trường Sơn.",
        dialogs: [
          { speaker: "Hùng", text: "Nhiệm vụ vô cùng khẩn cấp, chúng ta phải mở được con đường đưa xe cứu trợ qua dãy núi này nhanh nhất!", align: "left" }
        ]
      },
      {
        page: 2,
        image: "/images/comic/mountain_page_2.webp",
        narration: "Họ đi đến điểm đầu tuyến đường thì phát hiện một vực sâu khổng lồ chia cắt địa hình. Đi thẳng theo đường chim bay là bất khả thi.",
        dialogs: [
          { speaker: "Liên", text: "Vực sâu thế này thì làm sao xe tải qua được anh Hùng ơi? Chúng ta không thể đi thẳng được rồi!", align: "left" }
        ]
      },
      {
        page: 3,
        image: "/images/comic/mountain_page_3.webp",
        narration: "Những nước nghèo đi lên CNXH giống như gặp vực sâu lớn (thiếu LLSX phát triển). Đi thẳng sẽ thất bại, bắt buộc phải tìm đường vòng (gián tiếp).",
        dialogs: [
          { speaker: "Hùng", text: "Chúng ta không thể nhảy qua vực. Phải mở đường vòng men theo vách núi đá bên kia, tuy xa và quanh co nhưng xe mới đi an toàn được.", align: "left" }
        ]
      },
      {
        page: 4,
        image: "/images/comic/mountain_page_4.webp",
        narration: "Bắt đầu hành trình đầy gian khổ của con đường vòng gián tiếp. Mỗi tấc đường mở ra trên vách đá đứng đòi hỏi nỗ lực phi thường.",
        dialogs: [
          { speaker: "Liên", text: "Con đường này quanh co quá anh Hùng ạ, đi thế này vừa mất sức vừa lâu hơn đường thẳng nhiều.", align: "left" },
          { speaker: "Hùng", text: "Đây là lựa chọn duy nhất giúp xe tải chở hàng nặng đi qua an toàn. Sự quanh co là tất yếu!", align: "right" }
        ]
      },
      {
        page: 5,
        image: "/images/comic/mountain_page_5.webp",
        narration: "Trời đổ mưa rừng sạt lở dữ dội, xe chở đá bị sa lầy nhão nhoét. Đây chính là những khó khăn, bước lùi tạm thời thường thấy của thời kỳ quá độ.",
        dialogs: [
          { speaker: "Liên", text: "Mưa gió sạt lở thế này, liệu con đường vòng của chúng ta có đi đến đích được không anh?", align: "left" },
          { speaker: "Hùng", text: "Kiên định lên em! Khó khăn chỉ là tạm thời, vượt qua đoạn sạt lầy này đường sẽ bằng phẳng.", align: "right" }
        ]
      },
      {
        page: 6,
        image: "/images/comic/mountain_page_6.webp",
        narration: "Cả đội chặt tre gỗ kết cầu treo tạm thời vượt suối lớn. Đây là giải pháp trung gian, bước quá độ tạm thời để nối liền tiến trình phát triển.",
        dialogs: [
          { speaker: "Hùng", text: "Chiếc cầu tre này là bước đệm trung gian. Có nó, xe ta mới đi qua được suối dữ để sang sườn núi bên kia.", align: "left" }
        ]
      },
      {
        page: 7,
        image: "/images/comic/mountain_page_7.webp",
        narration: "Nhờ các bước trung gian gián tiếp vững chắc, đoàn xe chở nặng đã vượt qua suối dữ an toàn, bắt đầu tiến sâu vào cung đường vòng.",
        dialogs: [
          { speaker: "Liên", text: "A! Xe qua được rồi! Con đường tránh của anh trông uốn lượn nhưng thực sự hoạt động tốt!", align: "left" }
        ]
      },
      {
        page: 8,
        image: "/images/comic/mountain_page_8.webp",
        narration: "Đoàn xe vượt qua khúc cua cuối cùng, hiện ra thung lũng bản làng yên bình nơi bà con đang đứng mong ngóng đoàn xe cứu trợ.",
        dialogs: [
          { speaker: "Bà con vùng lũ", text: "Xe cứu trợ tới rồi! Cảm ơn các cô chú thanh niên xung phong nhiều lắm!", align: "left" }
        ]
      },
      {
        page: 9,
        image: "/images/comic/mountain_page_9.webp",
        narration: "Lương thực được bàn giao cho đồng bào. Liên nhận ra đi vòng, đi gián tiếp qua những bước trung gian lại là con đường ngắn nhất và duy nhất.",
        dialogs: [
          { speaker: "Liên", text: "Bây giờ em đã hiểu rồi. Đôi khi đi vòng qua những bước trung gian lại là cách duy nhất để đến đích thành công.", align: "left" }
        ]
      },
      {
        page: 10,
        image: "/images/comic/mountain_page_10.webp",
        narration: "Mỗi quốc gia cần tự tìm ra con đường đi phù hợp với điều kiện lịch sử của riêng mình để tiến lên xây dựng xã hội mới vững bền.",
        dialogs: [
          { speaker: "Hùng", text: "Hành trình vạn dặm nào cũng bắt đầu từ những tấc đường nhỏ gian khó. Chúng ta đã mở đường thành công!", align: "left" }
        ]
      }
    ]
  }
];

function App() {
  const [progress, setProgress] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [storyIndex, setStoryIndex] = useState(0);
  const [comicPage, setComicPage] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const [viewMode, setViewMode] = useState<'shelf' | 'reading'>('shelf');

  useEffect(() => {
    let interval: any = null;
    if (autoplay) {
      interval = setInterval(() => {
        setComicPage((prev) => (prev < 10 ? prev + 1 : 0));
      }, 6000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoplay, storyIndex]);

  useEffect(() => {
    const onScroll = () => {
      const t = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(t > 0 ? (window.scrollY / t) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const rv = (el: HTMLElement | null) => {
    if (el && !refs.current.includes(el)) refs.current.push(el);
  };

  return (
    <>
      <div className="progress" style={{ width: `${progress}%` }} />

      <header className="topbar">
        <div className="topbar-brand">Triết học Mác–Lênin</div>
        <ul className="topbar-nav">
          <li><a href="#p1">Bối cảnh</a></li>
          <li><a href="#p2">Cơ sở</a></li>
          <li><a href="#p4">Tất yếu</a></li>
          <li><a href="#p6">Phân kỳ</a></li>
          <li><a href="#p9">Đặc điểm</a></li>
          <li><a href="#p11">Tổng kết</a></li>
          <li><a href="#ai" style={{ color: 'var(--amber)' }}>Ghi nhận AI</a></li>
          <li><a href="#comic" style={{ color: 'var(--amber)', fontWeight: 'bold' }}>Truyện tranh</a></li>
        </ul>
      </header>

      {/* ═══ HERO FOCUS ═══ */}
      <section className="page hero-focus" data-bg="MỞ ĐẦU" style={{ '--orb-x': '70%', '--orb-y': '30%' } as React.CSSProperties}>
        <p className="page-label">Chương 3 · Phần 1</p>
        <h1 className="page-title">
          Chủ Nghĩa Xã Hội: Giai Đoạn Đầu Của Hình Thái
          Kinh Tế–Xã Hội Cộng Sản Chủ Nghĩa
        </h1>
        <div className="hero-rule" />
        <p className="page-lead">
          Hệ thống hóa toàn diện cơ sở lý luận, tính tất yếu lịch sử
          và bản chất quy luật của thời kỳ quá độ
        </p>
        <p className="hero-meta">Bài thuyết trình Triết học Mác–Lênin</p>
        <div className="scroll-hint">Cuộn xuống</div>
      </section>

      {/* ═══ 3-COLUMN MATRIX — Mối liên hệ logic ═══ */}
      <section id="p1" className="page" data-bg="01" style={{ '--orb-x': '20%', '--orb-y': '70%', '--bg-x': '3%', '--bg-y': '5%' } as React.CSSProperties}>
        <div ref={rv} className="rv">
          <h2 className="page-title">Mối liên hệ logic giữa các chương</h2>
          <p className="page-lead">
            Để hiểu rõ logic khoa học của Chương 3, chúng ta cần điểm nhanh qua
            mạch phát triển tư tưởng từ hai chương trước:
          </p>
        </div>
        <div ref={rv} className="rv matrix-3">
          <div className="matrix-cell">
            <small>Chương 1</small>
            <h3>Nhập môn CNXHKH</h3>
            <p>
              Xác định đối tượng, phương pháp nghiên cứu và
              <span className="amber"> vị trí lý luận </span>
              của CNXHKH trong cấu trúc toàn bộ học thuyết Mác–Lênin.
            </p>
          </div>
          <div className="matrix-cell">
            <small>Chương 2</small>
            <h3>Sứ mệnh lịch sử của GCCN</h3>
            <p>
              Khẳng định <span className="amber">chủ thể thực hiện</span> bước chuyển
              đại nhảy vọt của lịch sử: Giai cấp công nhân là lực lượng xóa bỏ
              ách áp bức tư sản.
            </p>
          </div>
          <div className="matrix-cell">
            <small>Chương 3 — Tiêu điểm</small>
            <h3>Hình thái xã hội mới</h3>
            <p>
              Đi sâu vào <span className="amber">tiến trình tất yếu</span> và các giai đoạn
              phát triển cụ thể của hình thái xã hội mới mà CNXH là nấc thang đầu tiên.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ SPLIT 50/50 — Cơ sở lý luận ═══ */}
      <section id="p2" className="page" data-bg="02" style={{ '--orb-x': '80%', '--orb-y': '25%', '--bg-x': '8%' } as React.CSSProperties}>
        <div ref={rv} className="rv header-with-img">
          <div className="header-text">
            <h2 className="page-title">Cơ sở lý luận của Học thuyết Hình thái Kinh tế–Xã hội</h2>
            <p className="page-lead">
              C. Mác và Ph. Ăngghen đã xây dựng nên học thuyết vĩ đại về
              Hình thái kinh tế–xã hội khi mổ xẻ cấu trúc
              <span className="amber"> lịch sử xã hội tư bản</span>.
            </p>
          </div>
          <figure className="header-img">
            <img src="/images/marx-engels.png" alt="C. Mác và Ph. Ăngghen" />
            <figcaption>C. Mác và Ph. Ăngghen</figcaption>
          </figure>
        </div>
        <div ref={rv} className="rv split">
          <div className="split-panel">
            <h3>Hai đóng góp lớn</h3>
            <ul className="bullet-list">
              <li>
                Vạch rõ những <strong>quy luật cơ bản</strong> của sự vận động xã hội.
              </li>
              <li>
                Chỉ ra <strong>phương pháp khoa học</strong> cốt lõi để giải thích bản chất
                lịch sử loài người một cách khách quan, duy vật thay vì duy tâm.
              </li>
            </ul>
          </div>
          <div className="split-panel">
            <h3>Góc nhìn động lực học xã hội</h3>
            <ul className="bullet-list">
              <li>
                Không chỉ làm rõ các yếu tố cấu thành tĩnh
                (Lực lượng sản xuất, Quan hệ sản xuất, Kiến trúc thượng tầng).
              </li>
              <li>
                Quan trọng hơn: xem xét xã hội trong quá trình
                <strong> biến đổi và phát triển không ngừng</strong>.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ 3-COLUMN MATRIX — Lênin ═══ */}
      <section className="page" data-bg="03" style={{ '--orb-x': '15%', '--orb-y': '40%', '--bg-x': '2%', '--bg-y': '15%' } as React.CSSProperties}>
        <div ref={rv} className="rv header-with-img">
          <div className="header-text">
            <h2 className="page-title">Sự phát triển lý luận và hiện thực hóa của V.I. Lênin</h2>
            <p className="page-lead">
              Từ nền tảng lý luận thuần túy của thế kỷ XIX, học thuyết đã trải qua
              bước ngoặt lịch sử quan trọng bước vào thế kỷ XX.
            </p>
          </div>
          <figure className="header-img">
            <img src="/images/lenin.png" alt="V.I. Lênin" />
            <figcaption>V.I. Lênin (1870–1924)</figcaption>
          </figure>
        </div>
        <div ref={rv} className="rv matrix-3">
          <div className="matrix-cell">
            <small>Đóng góp 1</small>
            <h3>Bổ sung mang tính thời đại</h3>
            <p>
              Lênin tiếp thu tinh thần Mác–Ăngghen, bổ sung đặc điểm của
              <span className="amber"> chủ nghĩa tư bản giai đoạn độc quyền</span>
              (Chủ nghĩa đế quốc) vào học thuyết.
            </p>
          </div>
          <div className="matrix-cell">
            <small>Đóng góp 2</small>
            <h3>Hiện thực hóa sinh động</h3>
            <p>
              Đưa lý luận vào đời sống thông qua lãnh đạo thực tiễn xây dựng CNXH
              ở <span className="amber">nước Nga Xôviết</span> sau
              Cách mạng Tháng Mười.
            </p>
          </div>
          <div className="matrix-cell">
            <small>Đóng góp 3</small>
            <h3>Tài sản vô giá của nhân loại</h3>
            <p>
              Tạo nên Học thuyết HTKT-XH hoàn chỉnh, cung cấp cho giai cấp
              công nhân toàn cầu <span className="amber">tiêu chuẩn thực sự duy vật,
              khoa học</span> để phân kỳ lịch sử.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ SPLIT 50/50 — Tính tất yếu ═══ */}
      <section id="p4" className="page" data-bg="04" style={{ '--orb-x': '75%', '--orb-y': '65%', '--bg-x': '5%' } as React.CSSProperties}>
        <div ref={rv} className="rv">
          <h2 className="page-title">Tính tất yếu mang tính Quy luật Lịch sử–Tự nhiên</h2>
        </div>
        <div ref={rv} className="rv quote">
          <blockquote>
            Học thuyết HTKT-XH của chủ nghĩa Mác–Lênin đã chỉ ra tính tất yếu
            của sự thay thế HTKT-XH tư bản chủ nghĩa bằng HTKT-XH cộng sản chủ nghĩa.
            Đó là một <span className="amber">quá trình lịch sử–tự nhiên</span>.
          </blockquote>
        </div>
        <div ref={rv} className="rv split">
          <div className="split-panel">
            <h3>Thế nào là "Quá trình lịch sử–tự nhiên"?</h3>
            <ul className="bullet-list">
              <li>
                Sự sụp đổ của phương thức sản xuất tư bản diễn ra
                hoàn toàn <strong>khách quan</strong>.
              </li>
              <li>
                Tiến trình tuân theo quy luật vận động nội tại của xã hội,
                tựa như quy luật trong giới tự nhiên, không phụ thuộc vào
                ý muốn chủ quan hay mệnh lệnh của bất kỳ cá nhân nào.
              </li>
            </ul>
          </div>
          <div className="split-panel">
            <h3>Phương thức dịch chuyển xã hội</h3>
            <ul className="bullet-list">
              <li>
                Sự thay thế này không diễn ra tự động, hòa bình hay tự phát.
              </li>
              <li>
                Bắt buộc phải <strong>thực hiện thông qua Cách mạng XHCN</strong>
                — cuộc cải biến toàn diện nhằm lật đổ giai cấp thống trị cũ.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ SPLIT 50/50 — Hai tiền đề ═══ */}
      <section className="page" data-bg="05" style={{ '--orb-x': '25%', '--orb-y': '30%', '--bg-x': '10%', '--bg-y': '8%' } as React.CSSProperties}>
        <div ref={rv} className="rv">
          <h2 className="page-title">Hai tiền đề vật chất quyết định sự ra đời của HTKT-XH mới</h2>
          <p className="page-lead">
            Cuộc cách mạng XHCN chỉ có thể bùng nổ khi xã hội tích lũy đủ
            <span className="amber"> hai tiền đề vật chất</span> phát sinh từ trong lòng
            xã hội tư bản cũ:
          </p>
          <figure className="illus">
            <img src="/images/factory-workers.png" alt="Nền đại công nghiệp và giai cấp công nhân" />
            <figcaption>Nền đại công nghiệp TBCN — nơi thai nghén hai tiền đề cách mạng</figcaption>
          </figure>
        </div>
        <div ref={rv} className="rv split">
          <div className="split-panel">
            <h3>Tiền đề 1: Lực lượng sản xuất</h3>
            <ul className="bullet-list">
              <li>
                Nền đại công nghiệp TBCN thúc đẩy LLSX phát triển đạt tới mức
                <strong> xã hội hóa cao độ</strong>.
              </li>
              <li>
                Bản chất xã hội hóa này xung đột gay gắt với QHSX dựa trên
                chế độ chiếm hữu tư nhân TBCN.
              </li>
              <li>
                Mâu thuẫn đòi hỏi phá vỡ xiềng xích QHSX tư sản để
                giải phóng hoàn toàn năng lực sản xuất.
              </li>
            </ul>
          </div>
          <div className="split-panel">
            <h3>Tiền đề 2: Giai cấp công nhân</h3>
            <ul className="bullet-list">
              <li>
                Kinh tế tư bản đồng thời tạo ra và rèn luyện giai cấp công nhân.
              </li>
              <li>
                Trưởng thành vượt bậc về <strong>ý thức chính trị,
                tính tổ chức, tinh thần kỷ luật</strong>.
              </li>
              <li>
                Được vũ trang bằng lý luận Mác–Lênin → lực lượng chính trị độc lập,
                tự giác gánh vác sứ mệnh: <span className="amber">Đào huyệt chôn vùi CNTB</span>.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ LINEAR TIMELINE — Phân kỳ ═══ */}
      <section id="p6" className="page" data-bg="06" style={{ '--orb-x': '85%', '--orb-y': '50%' } as React.CSSProperties}>
        <div ref={rv} className="rv">
          <h2 className="page-title">Lý luận phân kỳ Hình thái Kinh tế–Xã hội Cộng sản Chủ nghĩa</h2>
          <p className="page-lead">
            Không xuất hiện hoàn hảo ngay lập tức — tiến hóa tuần tự
            <span className="amber"> từ thấp lên cao</span> qua hai giai đoạn:
          </p>
        </div>
        <div ref={rv} className="rv timeline">
          <div className="tl-node">
            <div className="tl-dot" />
            <h3>Xã hội cũ: Tư bản Chủ nghĩa</h3>
            <p>Điểm xuất phát — xã hội dựa trên chế độ tư hữu.</p>
          </div>
          <div className="tl-node">
            <div className="tl-dot" />
            <h3>Thời kỳ quá độ</h3>
            <p>Giai đoạn trung gian, cải biến cách mạng sâu sắc.
              Nằm đan xen giữa xã hội TBCN và xã hội CSCN.</p>
          </div>
          <div className="tl-node">
            <div className="tl-dot" />
            <h3>Giai đoạn thấp: Chủ nghĩa xã hội</h3>
            <p>Xã hội mới hình thành, còn mang "dấu vết" xã hội cũ.</p>
          </div>
          <div className="tl-node">
            <div className="tl-dot" />
            <h3>Giai đoạn cao: Chủ nghĩa cộng sản</h3>
            <p>Phát triển hoàn chỉnh trên cơ sở của chính nó.
              Nguyên tắc tối cao: <span className="amber">"Làm theo năng lực, hưởng theo nhu cầu"</span>.</p>
          </div>
        </div>
        <figure ref={rv} className="rv illus">
          <img src="/images/october-rev.png" alt="Cách mạng Tháng Mười Nga 1917" />
          <figcaption>Cách mạng Tháng Mười 1917 — bước ngoặt hiện thực hóa lý luận phân kỳ</figcaption>
        </figure>
      </section>

      {/* ═══ SPLIT 50/50 — Luận điểm Mác ═══ */}
      <section className="page" data-bg="07" style={{ '--orb-x': '30%', '--orb-y': '75%', '--bg-x': '4%', '--bg-y': '12%' } as React.CSSProperties}>
        <div ref={rv} className="rv header-with-img">
          <div className="header-text">
            <h2 className="page-title">Luận điểm kinh điển của C. Mác trong "Phê phán cương lĩnh Gôta"</h2>
          </div>
          <figure className="header-img">
            <img src="/images/gotha.png" alt="Phê phán cương lĩnh Gôta (1875)" />
            <figcaption>"Phê phán cương lĩnh Gôta" (1875)</figcaption>
          </figure>
        </div>
        <div ref={rv} className="rv quote">
          <blockquote>
            "Giữa xã hội tư bản chủ nghĩa và xã hội cộng sản chủ nghĩa là một
            thời kỳ cải biến cách mạng từ xã hội nọ sang xã hội kia. Thích ứng với
            thời kỳ ấy là một thời kỳ quá độ chính trị, và nhà nước của thời kỳ ấy
            không thể là cái gì khác hơn là
            <span className="amber"> nền chuyên chính cách mạng của giai cấp vô sản</span>."
          </blockquote>
          <cite>— C. Mác và Ph. Ăngghen: Toàn tập, t.19, tr.47.</cite>
        </div>
        <div ref={rv} className="rv split">
          <div className="split-panel">
            <h3>Về bản chất thời kỳ</h3>
            <ul className="bullet-list">
              <li>
                Quá độ không phải trạng thái tĩnh tại — là
                <strong> thời kỳ cải biến cách mạng</strong> sâu sắc, toàn diện
                nhằm xóa bỏ gốc rễ xã hội cũ, gieo mầm xã hội mới.
              </li>
            </ul>
          </div>
          <div className="split-panel">
            <h3>Về bản chất nhà nước</h3>
            <ul className="bullet-list">
              <li>
                Nền <strong>chuyên chính cách mạng của giai cấp vô sản</strong>:
                đập tan sự phản kháng của giai cấp bóc lột cũ + tổ chức quần chúng
                xây dựng kinh tế–xã hội mới.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ HERO FOCUS — Lênin khẳng định ═══ */}
      <section className="page hero-focus" data-bg="08" style={{ '--orb-x': '50%', '--orb-y': '40%' } as React.CSSProperties}>
        <div ref={rv} className="rv">
          <h2 className="page-title">
            Sự khẳng định mang tính nguyên tắc của V.I. Lênin
          </h2>
        </div>
        <div ref={rv} className="rv quote" style={{ textAlign: 'left' }}>
          <blockquote>
            "Về lý luận, không thể nghi ngờ gì được rằng giữa chủ nghĩa tư bản
            và chủ nghĩa cộng sản, có một
            <span className="amber"> thời kỳ quá độ nhất định</span>."
          </blockquote>
          <cite>— V.I. Lênin: Toàn tập, t.39, tr.309.</cite>
        </div>
        <div ref={rv} className="rv" style={{ maxWidth: 640, textAlign: 'left' }}>
          <ul className="bullet-list">
            <li>
              <strong>Loại bỏ tư tưởng tả khuynh</strong> — Chống lại tư tưởng nóng vội,
              đòi "đốt cháy giai đoạn", bỏ qua các bước đi trung gian.
            </li>
            <li>
              <strong>Tính tất yếu quy luật</strong> — Cụm từ
              <span className="amber"> "nhất định"</span> khẳng định thời kỳ quá độ là
              quy luật khách quan, bắt buộc với mọi quốc gia, bất kể điểm xuất phát.
            </li>
          </ul>
        </div>
      </section>

      {/* ═══ 3-COLUMN MATRIX — Bản chất & Đặc điểm ═══ */}
      <section id="p9" className="page" data-bg="09" style={{ '--orb-x': '70%', '--orb-y': '20%', '--bg-x': '6%' } as React.CSSProperties}>
        <div ref={rv} className="rv header-with-img">
          <div className="header-text">
            <h2 className="page-title">Bản chất và Đặc điểm xã hội của Thời kỳ quá độ</h2>
          </div>
          <figure className="header-img">
            <img src="/images/transition-society.png" alt="Giao thoa giữa xã hội cũ và mới" />
            <figcaption>Xã hội quá độ — giao thoa cũ và mới</figcaption>
          </figure>
        </div>
        <div ref={rv} className="rv quote">
          <blockquote>
            "…một xã hội cộng sản chủ nghĩa vừa thoát thai từ xã hội tư bản chủ nghĩa,
            do đó về mọi phương diện — kinh tế, đạo đức, tinh thần — còn mang
            <span className="amber"> những dấu vết của xã hội cũ</span> mà nó đã lọt lòng ra."
          </blockquote>
          <cite>— C. Mác và Ph. Ăngghen: Toàn tập, t.19, tr.47.</cite>
        </div>
        <div ref={rv} className="rv matrix-3">
          <div className="matrix-cell">
            <small>Phương diện 1</small>
            <h3>Kinh tế</h3>
            <p>
              Tồn tại cơ cấu kinh tế nhiều thành phần; đan xen phức tạp giữa
              nhân tố XHCN mới đang hình thành và thành phần tư sản, tư nhân cũ.
            </p>
          </div>
          <div className="matrix-cell">
            <small>Phương diện 2</small>
            <h3>Đạo đức</h3>
            <p>
              Còn tồn tại tư tưởng cá nhân chủ nghĩa, thói quen ích kỷ,
              lối sống thực dụng và tư duy coi khinh lao động chân tay.
            </p>
          </div>
          <div className="matrix-cell">
            <small>Phương diện 3</small>
            <h3>Tinh thần</h3>
            <p>
              Đấu tranh gay gắt giữa hệ tư tưởng cách mạng tiên tiến với
              tàn dư tâm lý, hủ tục phong kiến và tư sản chưa được quét sạch.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ SPLIT 50/50 — Hai ý nghĩa ═══ */}
      <section className="page" data-bg="10" style={{ '--orb-x': '20%', '--orb-y': '55%', '--bg-x': '8%', '--bg-y': '6%' } as React.CSSProperties}>
        <div ref={rv} className="rv">
          <h2 className="page-title">Hai ý nghĩa lý luận và thực tiễn về Thời kỳ quá độ</h2>
          <p className="page-lead">
            Từ sự đúc kết của C. Mác và thực tiễn của V.I. Lênin tại nước Nga Xôviết,
            thời kỳ quá độ được hiểu theo <span className="amber">hai nghĩa</span>:
          </p>
        </div>
        <div ref={rv} className="rv split">
          <div className="split-panel">
            <h3>Nghĩa 1: Nước chưa trải qua TBCN phát triển cao</h3>
            <ul className="bullet-list">
              <li>
                <strong>Lênin:</strong> "cần phải có một thời kỳ quá độ
                <span className="amber"> khá lâu dài</span> từ CNTB lên CNXH".
              </li>
              <li>
                Phương thức quá độ <strong>gián tiếp</strong>, vô cùng gian khổ, phức tạp.
              </li>
              <li>
                <strong>"Những cơn đau đẻ kéo dài"</strong> — Nhiệm vụ kép:
                vừa trấn áp giai cấp, vừa tự xây dựng toàn bộ cơ sở vật chất–kỹ thuật.
              </li>
            </ul>
          </div>
          <div className="split-panel">
            <h3>Nghĩa 2: Nước đã trải qua TBCN phát triển cao</h3>
            <ul className="bullet-list">
              <li>
                Vẫn <strong>bắt buộc trải qua thời kỳ quá độ nhất định</strong>,
                dù đã có nền tảng LLSX đại công nghiệp hiện đại.
              </li>
              <li>
                Cần thời gian cải biến toàn diện: QHSX tư hữu → công hữu,
                thiết lập hệ tư tưởng mới, xây dựng nguyên tắc phân phối XHCN.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ Tổng kết ═══ */}
      <section id="p11" className="page" data-bg="11" style={{ '--orb-x': '65%', '--orb-y': '35%', '--bg-x': '3%' } as React.CSSProperties}>
        <div ref={rv} className="rv">
          <h2 className="page-title">Tổng kết — 3 từ khóa chiến lược</h2>
          <p className="page-lead">
            Khi trình bày trước hội đồng và giảng viên,
            nhóm thuyết trình cần làm nổi bật:
          </p>
        </div>
        <div ref={rv} className="rv summary-strip">
          <div className="summary-row">
            <div className="summary-num">1</div>
            <div>
              <h3>Tất yếu khách quan</h3>
              <p>
                Sự chuyển biến lên CNXH không phải ý muốn chính trị nhất thời,
                mà là <span className="amber">quá trình lịch sử–tự nhiên</span>,
                được thúc đẩy bởi mâu thuẫn vật chất nội tại không thể điều hòa.
              </p>
            </div>
          </div>
          <div className="summary-row">
            <div className="summary-num">2</div>
            <div>
              <h3>Biến đổi toàn diện & đan xen</h3>
              <p>
                Thời kỳ quá độ mang tính giao thoa — đấu tranh gay gắt giữa cái mới
                vừa thoát thai và cái cũ trên mọi lĩnh vực:
                <span className="amber"> Kinh tế, Đạo đức, Tinh thần</span>.
              </p>
            </div>
          </div>
          <div className="summary-row">
            <div className="summary-num">3</div>
            <div>
              <h3>Tính đa dạng thực tiễn</h3>
              <p>
                Dài hay ngắn, trực tiếp hay gián tiếp — phụ thuộc vào điểm xuất phát
                của LLSX mỗi quốc gia. Với nước lạc hậu, tất yếu là
                <span className="amber"> "những cơn đau đẻ kéo dài"</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ GHI NHẬN SỬ DỤNG AI SECTION ═══ */}
      <section id="ai" className="page" data-bg="AI" style={{ '--orb-x': '80%', '--orb-y': '70%', '--bg-x': '10%' } as React.CSSProperties}>
        <div ref={rv} className="rv">
          <p className="page-label">Công nghệ hỗ trợ</p>
          <h2 className="page-title">Ghi nhận Sử dụng công nghệ AI</h2>
          <p className="page-lead">
            Trang này ghi nhận các hạng mục AI đã được sử dụng hỗ trợ trong đề tài. Toàn bộ nội dung học thuật cuối cùng đều do nhóm sinh viên kiểm tra, biên tập và chịu trách nhiệm.
          </p>
        </div>

        <div ref={rv} className="rv split">
          <div className="split-panel">
            <h3>01. Hỗ trợ biên soạn Tài liệu</h3>
            <ul className="bullet-list">
              <li><strong>Mục đích:</strong> Tạo bản nháp cấu trúc tài liệu đề tài để nhóm triển khai nội dung nhanh và đầy đủ ý.</li>
              <li><strong>Prompt chính:</strong> Đề xuất bố cục nội dung lý luận chính trị bám sát đề bài môn học, gồm phần mở đầu, nội dung và kết luận.</li>
              <li><strong>Kiểm chứng:</strong> Nhóm đã tự rà soát toàn bộ văn bản, chuẩn hóa câu chữ theo đúng giáo trình, bổ sung lập luận và ví dụ thực tiễn tự viết.</li>
            </ul>
          </div>
          
          <div className="split-panel">
            <h3>02. Gợi ý & Sinh ảnh minh họa</h3>
            <ul className="bullet-list">
              <li><strong>Mục đích:</strong> Gợi ý bối cảnh và sinh hình ảnh phác thảo chì minh họa cho các câu chuyện triết lý thêm sinh động.</li>
              <li><strong>Prompt chính:</strong> Vẽ phác thảo chì đen trắng phong cảnh làng quê, thợ rèn, và con người Việt Nam.</li>
              <li><strong>Kiểm chứng:</strong> Nhóm tự chọn lọc, chỉnh sửa kích thước, tối ưu hóa định dạng WebP để đảm bảo tính thẩm mỹ, nhất quán và nội dung học thuật phù hợp.</li>
            </ul>
          </div>
        </div>

        <div ref={rv} className="rv quote" style={{ marginTop: '40px' }}>
          <blockquote>
            <strong>Cam kết học thuật:</strong> AI chỉ đóng vai trò trợ lý hỗ trợ phác thảo tài liệu và sinh ảnh minh họa. 
            Chúng tôi không để AI làm thay hoàn toàn và chịu trách nhiệm cao nhất về tính chính xác, hợp lệ của sản phẩm thuyết trình cuối cùng.
          </blockquote>
        </div>
      </section>

      {/* ═══ INTERACTIVE COMIC BOOK SECTION ═══ */}
      <section id="comic" className="page comic-section" data-bg="TRUYỆN" style={{ '--orb-x': '15%', '--orb-y': '60%', '--bg-x': '5%' } as React.CSSProperties}>
        <div ref={rv} className="rv">
          <p className="page-label">Tuyển tập truyện tranh triết lý</p>
          <h2 className="page-title">Tranh Vẽ Triết Lý Cuộc Sống</h2>
          <p className="page-lead">
            Khám phá các quy luật biện chứng duy vật và các phạm trù triết lý qua tuyển tập truyện tranh vẽ chì mộc mạc bối cảnh Việt Nam.
          </p>
        </div>

        {viewMode === 'shelf' ? (
          <div ref={rv} className="rv bookshelf-grid">
            {storiesData.map((story, index) => (
              <div 
                key={story.id} 
                className="book-card"
                onClick={() => {
                  setStoryIndex(index);
                  setComicPage(0);
                  setAutoplay(false);
                  setViewMode('reading');
                }}
              >
                <div className="book-card-cover-container">
                  <img src={story.pages[0].image} alt={story.title} className="book-card-cover" />
                  <div className="book-card-hover-overlay">
                    <span className="read-now-btn">Đọc Truyện 📖</span>
                  </div>
                </div>
                <div className="book-card-info">
                  <h3>{story.title.split(" (")[0]}</h3>
                  <p className="book-card-theme">
                    {story.title.includes(" (") 
                      ? story.title.substring(story.title.indexOf(" (") + 2, story.title.length - 1) 
                      : ""}
                  </p>
                  <p className="book-card-desc">
                    {story.pages[0].narration}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div ref={rv} className="rv">
            {/* Thanh tiêu đề đọc truyện & nút quay lại */}
            <div className="reading-header">
              <button className="back-to-shelf-btn" onClick={() => setViewMode('shelf')}>
                ← Quay lại Tủ sách
              </button>
              <h3 className="reading-title">{storiesData[storyIndex].title}</h3>
            </div>

            <div className="comic-wrapper">
              {/* Khung lật sách 3D */}
              <div className="comic-frame-container">
                <div className="book-3d">
                  {storiesData[storyIndex].pages.map((data, index) => {
                    let pageClass = "book-page-sheet";
                    if (index < comicPage) {
                      pageClass += " flipped";
                    } else if (index === comicPage) {
                      pageClass += " active";
                    } else {
                      pageClass += " upcoming";
                    }

                    return (
                      <div 
                        key={data.page} 
                        className={pageClass}
                        style={{ zIndex: storiesData[storyIndex].pages.length - index } as React.CSSProperties}
                      >
                        <span className="comic-badge">
                          {index === 0 ? "Trang bìa" : `Trang ${index} / 10`}
                        </span>
                        <img 
                          src={data.image} 
                          alt={index === 0 ? "Bìa sách" : `Trang truyện ${index}`} 
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dẫn truyện & Thoại */}
              <div className="comic-info">
                <div>
                  <div className="comic-narration-box">
                    {storiesData[storyIndex].pages[comicPage].narration}
                  </div>
                  
                  <div className="dialog-bubbles">
                    {storiesData[storyIndex].pages[comicPage].dialogs.map((dialog, index) => (
                      <div key={index} className={`dialog-bubble ${dialog.align === 'right' ? 'right' : ''}`}>
                        <div className="dialog-speaker">{dialog.speaker}</div>
                        <div className="dialog-text">{dialog.text}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Điều khiển trang truyện */}
                <div className="comic-control-bar">
                  <div>
                    <select 
                      className="comic-page-select"
                      value={comicPage}
                      onChange={(e) => setComicPage(Number(e.target.value))}
                    >
                      {storiesData[storyIndex].pages.map((data) => (
                        <option key={data.page} value={data.page}>
                          {data.page === 0 ? "Trang bìa" : `Trang ${data.page}: ${data.narration.substring(0, 20)}...`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="comic-buttons">
                    <button 
                      className={`comic-btn autoplay ${autoplay ? 'active' : ''}`}
                      onClick={() => setAutoplay(!autoplay)}
                    >
                      {autoplay ? (
                        <>
                          <span>⏸</span> Dừng đọc
                        </>
                      ) : (
                        <>
                          <span>▶</span> Tự động đọc
                        </>
                      )}
                    </button>
                    <button 
                      className="comic-btn"
                      onClick={() => setComicPage((prev) => Math.max(0, prev - 1))}
                      disabled={comicPage === 0}
                    >
                      ◀ Trước
                    </button>
                    <button 
                      className="comic-btn"
                      onClick={() => setComicPage((prev) => Math.min(10, prev + 1))}
                      disabled={comicPage === 10}
                    >
                      Sau ▶
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default App;
