const mongoose = require("mongoose");

const overviewSchema = new mongoose.Schema(
    {
        eduName: {
            type: String,
            require: true,
            //default: 'Chương trình đào tạo cử nhân chính quy ngành Kỹ thuật Phần mềm',
        },
        eduId: {
            type: String,
            require: true,
            //default: '7480103',
        },
        eduType: {
            type: String,
            require: true,
            //default: 'Chính quy tập trung',
        },
        applicableSubjects: {
            type: String,
            require: true,
            //default: 'Từ khóa tuyển năm 2022',
        },
        formOfTraining: {
            type: Object,
            require: true,
            // default: {
            //     listForm: {
            //         type: {
            //             type: String,
            //             default: 'Chính quy tập trung',
            //         },
            //         creditsNumber: {
            //             type: Number,
            //             default: 130,
            //         },
            //         time: {
            //             type: String,
            //             default: '4 năm (8 học kỳ chính)'
            //         }
            //     }
            // },
        },
        goalsTraining: {
            type: String,
            require: true,
            //default: '<p>Chương trình đào tạo hướng đến đào tạo nguồn nhân lực công nghệ thông tin chất lượng cao đạt trình độ khu vực và quốc tế, đáp ứng nhu cầu xây dựng nguồn nhân lực ngành công nghiệp công nghệ thông tin trong cả nước.</p> <p>Sinh viên tốt nghiệp chương trình Cử nhân chính quy ngành Kỹ thuật phần mềm phải đáp ứng các yêu cầu: </p> <ul> <li>Có kiến thức cơ bản vững vàng, trình độ chuyên môn giỏi, kỹ năng phát triển phần mềm chuyên nghiệp, có năng lực nghiên cứu và tư duy sáng tạo.  </li> <li>Nắm vững quy trình xây dựng phát triển phần mềm, có khả năng triển khai xây dựng các hệ thống ứng dụng tin học và phân tích, thiết kế xây dựng các phần mềm có giá trị thực tiễn cao, có tính sáng tạo.</li> <li>Có trình độ tiếng Anh tốt, có thể giao tiếp, làm việc với các chuyên gia, đồng nghiệp nước ngoài.</li> <li>Khoá luận tốt nghiệp có thể ươm mầm cho các phần mềm trong tương lai.</li> </ul>'
        },
        goalsAfterTraining: {
            type: String,
            required: true,
            //default: '<p>Sinh viên tốt nghiệp ngành Kỹ thuật phần mềm có thể làm việc ở các phạm vi và lĩnh vực khác nhau như: </p><ol><li> Chuyên viên phân tích, thiết kế, cài đặt, quản trị, bảo trì các phần mềm máy tính đáp ứng các ứng dụng khác nhau trong các cơ quan, công ty, trường học... </li><li>Học tiếp các bậc học cao hơn của ngành Kỹ thuật phần mềm hoặc các ngành liên quan như Khoa học máy tính, Công nghệ thông tin, Hệ thống thông tin tại các cơ sở đào tạo trong và ngoài nước. </li><li> Cán bộ nghiên cứu và ứng dụng Công nghệ thông tin ở các viện, trung tâm nghiên cứu và các trường đại học, cao đẳng. Giảng dạy các môn liên quan đến công nghệ thông tin, công nghệ phần mềm tại các trường đại học, cao đẳng, trung học chuyên nghiệp, dạy nghề và các trường phổ thông.</li><li>Nghiên cứu khoa học thuộc các lĩnh vực về công nghệ phần mềm và các hệ thống nhúng ở các viện nghiên cứu, các trung tâm và cơ quan nghiên cứu của các Bộ, Ngành, các trường Đại học và Cao đẳng.</li><li>Làm việc ở bộ phận công nghệ thông tin hoặc cần ứng dụng công nghệ thông tin của tất cả các đơn vị có nhu cầu (hành chính sự nghiệp, ngân hàng, viễn thông, hàng không, xây dựng…).</li><li>Làm việc trong các công ty sản xuất, gia công phần mềm trong nước cũng như nước ngoài. Làm việc tại các công ty tư vấn về đề xuất giải pháp, xây dựng và bảo trì các hệ thống phần mềm.</li></ol>'
        },
        perspectivesTraining: {
            type: String,
            //required: true,
            //default: '<p>Chương trình đào tạo cử nhân Kỹ thuật phần mềm được xây dựng trên quan điểm:</p><ul><li>Chương trình đào tạo mang tính liên ngành, tính nghiên cứu và tính ứng dụng cao, phù hợp với nhu cầu nhân lực Công nghệ phần mềm của xã hội hiện nay…</li><li>Chương trình gần với chương trình đào tạo ngành Kỹ thuật phần mềm của nhiều trường đại học trong nước và trên thế giới để có thể hợp tác quốc tế và đào tạo nâng cao sau này.</li></ul>',
        },
        
        degreeTraining: {
            type: String,
            require: true,
            //default: 'Đại học',
        },
        majorTraining: {
            type: String,
            require: true,
            //default: 'Kỹ thuật Phần mềm',
        },
        idUserLatestEdit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
          },
          listIdUserEdited: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
          }],
          createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Overview", overviewSchema);